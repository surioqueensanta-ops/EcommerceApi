package com.ws101.Surio.controller;

import com.ws101.Surio.model.Product;
import com.ws101.Surio.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")  
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return service.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return service.createProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return service.updateProduct(id, product)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        boolean deleted = service.deleteProduct(id);

        if (deleted) {
            return "Deleted successfully";
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }
}