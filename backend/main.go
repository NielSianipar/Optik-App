package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// --- STRUKTUR DATA ---

type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	ImageURL    string  `json:"image_url"`
	Category    string  `json:"category"`
}

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Role     string `json:"role"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type OrderInput struct {
	CustomerName  string  `json:"customer_name"`
	TotalPrice    float64 `json:"total_price"`
	Items         string  `json:"items"`
	Address       string  `json:"address"`
	Phone         string  `json:"phone"`
	PaymentMethod string  `json:"payment"`
}

type Article struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	Author    string `json:"author"`
	ImageURL  string `json:"image_url"`
	CreatedAt string `json:"created_at"`
}

var db *sql.DB
var jwtKey = []byte("rahasia_dapur_optik_vibe_coding")

func main() {
	// 1. Koneksi Database
	var err error
	dsn := "root:@tcp(127.0.0.1:3306)/optik_db"
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("✅ Database Terhubung!")

	// --- AUTO MIGRATION (Anti-Crash) ---
	// Coba tambahkan kolom jika belum ada.
	db.Exec("ALTER TABLE orders ADD COLUMN items TEXT")
	db.Exec("ALTER TABLE orders ADD COLUMN address VARCHAR(255) DEFAULT ''")
	db.Exec("ALTER TABLE orders ADD COLUMN phone VARCHAR(20) DEFAULT ''")
	db.Exec("ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT ''")
	db.Exec("ALTER TABLE orders ADD COLUMN payment_status VARCHAR(50) DEFAULT 'Belum Lunas'") // UPDATE 1: Kolom Baru
	db.Exec("ALTER TABLE orders ADD COLUMN created_at DATETIME DEFAULT NOW()")

	r := gin.Default()

	// 2. Setup CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// --- ROUTE PUBLIK ---

	// Ambil Produk
	r.GET("/products", func(c *gin.Context) {
		category := c.Query("category")
		var rows *sql.Rows
		var err error

		if category != "" {
			rows, err = db.Query("SELECT id, name, price, description, image_url, category FROM products WHERE category = ?", category)
		} else {
			rows, err = db.Query("SELECT id, name, price, description, image_url, category FROM products")
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		products := []Product{}
		for rows.Next() {
			var p Product
			rows.Scan(&p.ID, &p.Name, &p.Price, &p.Description, &p.ImageURL, &p.Category)
			products = append(products, p)
		}
		c.JSON(http.StatusOK, products)
	})

	// Ambil Artikel (Versi Aman)
	r.GET("/articles", func(c *gin.Context) {
		query := `
            SELECT 
                id, 
                title, 
                content, 
                COALESCE(author, 'Admin'), 
                COALESCE(image_url, ''), 
                COALESCE(DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s'), '')
            FROM articles 
            ORDER BY id DESC
        `

		rows, err := db.Query(query)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		articles := []Article{}
		for rows.Next() {
			var a Article
			err := rows.Scan(&a.ID, &a.Title, &a.Content, &a.Author, &a.ImageURL, &a.CreatedAt)
			if err != nil {
				log.Println("⚠️ Gagal scan artikel:", err)
				continue
			}
			articles = append(articles, a)
		}
		c.JSON(http.StatusOK, articles)
	})
	// Register
	r.POST("/register", func(c *gin.Context) {
		var u User
		if err := c.ShouldBindJSON(&u); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), 10)
		_, err := db.Exec("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')", u.Name, u.Email, string(hashed))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Email sudah digunakan"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Registrasi berhasil"})
	})

	// Login
	r.POST("/login", func(c *gin.Context) {
		var input LoginInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var storedPassword, name, role string
		var id int
		err := db.QueryRow("SELECT id, password, name, role FROM users WHERE email = ?", input.Email).Scan(&id, &storedPassword, &name, &role)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User tidak ditemukan"})
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(input.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Password salah"})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": id,
			"role":    role,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		})
		tokenString, _ := token.SignedString(jwtKey)

		c.JSON(http.StatusOK, gin.H{"token": tokenString, "name": name, "role": role})
	})

	// Buat Pesanan
	r.POST("/orders", func(c *gin.Context) {
		var input OrderInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// UPDATE 2: Tentukan payment_status awal
		paymentStatus := "Belum Lunas"
		if input.PaymentMethod == "QRIS" || input.PaymentMethod == "DANA" {
			paymentStatus = "Menunggu Konfirmasi"
		}

		// Insert ke DB dengan status pembayaran
		_, err := db.Exec("INSERT INTO orders (customer_name, total_price, items, address, phone, payment_method, payment_status, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())",
			input.CustomerName, input.TotalPrice, input.Items, input.Address, input.Phone, input.PaymentMethod, paymentStatus)

		if err != nil {
			log.Println("Gagal insert order:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat pesanan: " + err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Order created"})
	})

	// Riwayat Pesanan Saya
	r.GET("/my-orders", func(c *gin.Context) {
		name := c.Query("name")
		rows, err := db.Query("SELECT id, customer_name, total_price, status, created_at FROM orders WHERE customer_name = ?", name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var orders []map[string]interface{}
		for rows.Next() {
			var id int
			var price float64
			var cust, status, date string
			rows.Scan(&id, &cust, &price, &status, &date)
			orders = append(orders, map[string]interface{}{
				"id": id, "customer_name": cust, "total_price": price, "status": status, "created_at": date,
			})
		}
		c.JSON(http.StatusOK, orders)
	})

	// --- ADMIN ENDPOINTS ---

	// Tambah/Update Produk
	r.POST("/admin/products", func(c *gin.Context) {
		var p Product
		c.ShouldBindJSON(&p)
		db.Exec("INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)",
			p.Name, p.Price, p.Description, p.ImageURL, p.Category)
		c.JSON(http.StatusOK, gin.H{"message": "Success"})
	})

	r.PUT("/admin/products/:id", func(c *gin.Context) {
		id := c.Param("id")
		var p Product
		c.ShouldBindJSON(&p)
		db.Exec("UPDATE products SET name=?, price=?, description=?, image_url=?, category=? WHERE id=?",
			p.Name, p.Price, p.Description, p.ImageURL, p.Category, id)
		c.JSON(http.StatusOK, gin.H{"message": "Updated"})
	})

	r.DELETE("/admin/products/:id", func(c *gin.Context) {
		db.Exec("DELETE FROM products WHERE id = ?", c.Param("id"))
		c.JSON(http.StatusOK, gin.H{"message": "Deleted"})
	})

	// Manajemen Pesanan (Admin)
	r.GET("/admin/orders", func(c *gin.Context) {
		// UPDATE 3: Select payment_status
		rows, err := db.Query("SELECT id, customer_name, total_price, status, COALESCE(payment_status, 'Belum Lunas') FROM orders ORDER BY id DESC")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var orders []map[string]interface{}
		for rows.Next() {
			var id int
			var price float64
			var cust, status, paymentStatus string
			rows.Scan(&id, &cust, &price, &status, &paymentStatus)
			orders = append(orders, map[string]interface{}{
				"id": id, "customer_name": cust, "total_price": price, "status": status, "payment_status": paymentStatus,
			})
		}
		c.JSON(http.StatusOK, orders)
	})

	// Update STATUS PESANAN (Proses/Kirim/Selesai)
	r.PUT("/admin/orders/:id", func(c *gin.Context) {
		id := c.Param("id")
		var input struct {
			Status string `json:"status"`
		}
		c.ShouldBindJSON(&input)
		db.Exec("UPDATE orders SET status = ? WHERE id = ?", input.Status, id)
		c.JSON(http.StatusOK, gin.H{"message": "Status updated"})
	})

	// UPDATE 4: Endpoint Validasi PEMBAYARAN
	r.PUT("/admin/orders/:id/payment", func(c *gin.Context) {
		id := c.Param("id")
		// Update jadi Lunas
		_, err := db.Exec("UPDATE orders SET payment_status = 'Lunas' WHERE id = ?", id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Pembayaran valid"})
	})

	// Endpoint Statistik untuk Chart (BARU)
	r.GET("/admin/stats", func(c *gin.Context) {
		// Query pendapatan harian selama 7 hari terakhir
		query := `
			SELECT 
				DATE_FORMAT(created_at, '%Y-%m-%d') as date, 
				SUM(total_price) as revenue 
			FROM orders 
			WHERE payment_status = 'Lunas' 
			GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d') 
			ORDER BY date ASC 
			LIMIT 7
		`
		
		rows, err := db.Query(query)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var stats []map[string]interface{}
		for rows.Next() {
			var date string
			var revenue float64
			if err := rows.Scan(&date, &revenue); err != nil {
				continue
			}
			stats = append(stats, map[string]interface{}{
				"name": date,
				"total": revenue,
			})
		}
		
		// Jika data kosong, kirim array kosong agar frontend tidak crash
		if stats == nil {
			stats = []map[string]interface{}{}
		}

		c.JSON(http.StatusOK, stats)
	})

	fmt.Println("🚀 Server berjalan di http://localhost:8080")
	r.Run(":8080")
}
