package com.niccolo.mychef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.niccolo.mychef.entity.Recipe;
import com.niccolo.mychef.repository.RecipeRepository;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    // GET /recipes => tutte le ricette con ingredienti
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // GET /recipes/{id} => dettaglio ricetta con ingredienti
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        return recipeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /recipes => crea ricetta con lista ingredienti
    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        // Assicuriamoci che ogni ingredient punti alla recipe
        if (recipe.getIngredients() != null) {
            recipe.getIngredients().forEach(i -> i.setRecipe(recipe));
        }
        return recipeRepository.save(recipe);
    }

    // DELETE /recipes/{id} => elimina ricetta (cascata su ingredienti)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        return recipeRepository.findById(id).map(r -> {
            recipeRepository.delete(r);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
