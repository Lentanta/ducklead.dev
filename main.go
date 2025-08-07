package main

import (
	"net/http"
	_ "os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Load HTML layout
	router.LoadHTMLGlob("templates/**/*")
	router.Static("static", "./static")

	router.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "pong"})
	})

	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "home", gin.H{
			"Title": "Welcome to my website!",
		})
	})

	router.GET("/about-me", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "about-me", gin.H{
			"Title": "About me",
		})
	})

	router.Run(":3000")
}
