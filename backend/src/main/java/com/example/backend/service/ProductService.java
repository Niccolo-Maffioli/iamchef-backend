package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Service per la logica di business relativa a `Product`.
     * Usa `ProductRepository` per esporre operazioni CRUD.
     */

    /**
     * Restituisce tutti i prodotti presenti nel database.
     * @return lista di `Product` (può essere vuota)
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Cerca un prodotto per identificatore.
     * @param id identificatore del prodotto (non nullo se chiamato correttamente)
     * @return `Optional<Product>` con il prodotto se trovato, altrimenti vuoto
     */
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Crea un nuovo prodotto (o aggiorna se l'entità ha già un id).
     * @param product entità `Product` da salvare
     * @return entità `Product` salvata (con id valorizzato)
     */
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Elimina il prodotto con l'id fornito.
     * @param id identificatore del prodotto da eliminare
     */
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Aggiorna i campi di un prodotto esistente.
     * - Se il prodotto con `id` esiste, copia i campi da `updatedProduct` e salva.
     * - Se non esiste, restituisce `null`.
     * @param id identificatore del prodotto da aggiornare
     * @param updatedProduct dati da usare per l'aggiornamento
     * @return prodotto aggiornato o `null` se non trovato
     */
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setPrice(updatedProduct.getPrice());
            product.setUser(updatedProduct.getUser());
            return productRepository.save(product);
        }).orElse(null);
    }
}
