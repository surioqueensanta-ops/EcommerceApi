package com.ws101.Surio.service;

import com.ws101.Surio.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service class for product-related operations.
 * Provides business logic for CRUD operations on products.
 * This class acts as an intermediary between the API controller and the data storage.
 *
 * @author Queensanta Surio
 * @see Product
 */
@Service
public class ProductService {

    private final List<Product> products = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public ProductService() {
        // Add 10 sample products
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

    /**
     * Retrieves all products from the in-memory database.
     *
     * @return List of all products, empty list if no products exist
     */
    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    /**
     * Finds a product by its unique ID.
     *
     * @param id the product ID to search for (must not be null)
     * @return Optional containing the product if found, empty Optional otherwise
     */
    public Optional<Product> getProductById(Long id) {
        return products.stream()
                .filter(p -> p.getId() != null && p.getId().equals(id))
                .findFirst();
    }

    /**
     * Creates a new product and assigns a unique ID.
     *
     * @param product the product to create (must not be null)
     * @return the created product with assigned ID
     */
    public Product createProduct(Product product) {
        product.setId(idCounter.getAndIncrement());
        products.add(product);
        return product;
    }

    /**
     * Updates an existing product by ID.
     *
     * @param id the ID of the product to update
     * @param updatedProduct the updated product data
     * @return Optional containing the updated product if found, empty Optional otherwise
     */
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

    /**
     * Deletes a product by its ID.
     *
     * @param id the ID of the product to delete
     * @return true if the product was deleted, false if not found
     */
    public boolean deleteProduct(Long id) {
        return products.removeIf(p -> p.getId() != null && p.getId().equals(id));
    }

    /**
     * Filters products by category.
     *
     * @param category the category to filter by (case-insensitive)
     * @return List of products matching the category
     */
    public List<Product> filterByCategory(String category) {
        return products.stream()
                .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                .toList();
    }

    /**
     * Filters products by price range.
     *
     * @param min the minimum price (inclusive)
     * @param max the maximum price (inclusive)
     * @return List of products within the price range
     */
    public List<Product> filterByPriceRange(Double min, Double max) {
        return products.stream()
                .filter(p -> p.getPrice() != null && p.getPrice() >= min && p.getPrice() <= max)
                .toList();
    }

    /**
     * Filters products by name (partial match, case-insensitive).
     *
     * @param name the name or partial name to search for
     * @return List of products with names containing the search term
     */
    public List<Product> filterByName(String name) {
        return products.stream()
                .filter(p -> p.getName() != null && p.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }
}