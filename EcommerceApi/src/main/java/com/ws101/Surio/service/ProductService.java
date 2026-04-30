package com.ws101.Surio.service;

import com.ws101.Surio.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final List<Product> products = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public ProductService() {
        products.add(new Product(idCounter.getAndIncrement(), "Laptop", "High-performance laptop", 999.99, "Electronics", 10, "laptop.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Mouse", "Wireless mouse", 29.99, "Electronics", 50, "mouse.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Keyboard", "Mechanical keyboard", 89.99, "Electronics", 30, "keyboard.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Monitor", "27-inch 4K monitor", 399.99, "Electronics", 15, "monitor.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Headphones", "Noise-cancelling headphones", 199.99, "Audio", 25, "headphones.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "T-Shirt", "Cotton t-shirt", 19.99, "Clothing", 100, "tshirt.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Jeans", "Denim jeans", 49.99, "Clothing", 40, "jeans.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Coffee Mug", "Ceramic coffee mug", 12.99, "Kitchen", 60, "mug.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Backpack", "Waterproof backpack", 79.99, "Accessories", 20, "backpack.jpg"));
        products.add(new Product(idCounter.getAndIncrement(), "Shoes", "Running shoes", 129.99, "Footwear", 35, "shoes.jpg"));
    }

    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    public Optional<Product> getProductById(Long id) {
        return products.stream()
                .filter(p -> p.getId() != null && p.getId().equals(id))
                .findFirst();
    }

    public Product createProduct(Product product) {
        product.setId(idCounter.getAndIncrement());
        products.add(product);
        return product;
    }

    public Optional<Product> updateProduct(Long id, Product updatedProduct) {
        return getProductById(id).map(existing -> {
            existing.setName(updatedProduct.getName());
            existing.setDescription(updatedProduct.getDescription());
            existing.setPrice(updatedProduct.getPrice());
            existing.setCategory(updatedProduct.getCategory());
            existing.setStockQuantity(updatedProduct.getStockQuantity());
            existing.setImageUrl(updatedProduct.getImageUrl());
            return existing;
        });
    }

    public boolean deleteProduct(Long id) {
        return products.removeIf(p -> p.getId() != null && p.getId().equals(id));
    }

    public List<Product> filterByCategory(String category) {
        return products.stream()
                .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                .toList();
    }

    // ✅ FIXED METHOD (THIS WAS YOUR ERROR)
    public List<Product> filterByPriceRange(Double min, Double max) {
        return products.stream()
                .filter(p -> (min == null || p.getPrice() >= min) &&
                             (max == null || p.getPrice() <= max))
                .toList();
    }

    public List<Product> filterByName(String name) {
        return products.stream()
                .filter(p -> p.getName() != null && p.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }
}