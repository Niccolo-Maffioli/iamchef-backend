package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Service per la logica di business relativa a `User`. Incapsula l'accesso
     * al `UserRepository` e fornisce operazioni CRUD.
     */
    /**
     * Restituisce tutti gli utenti.
     *
     * @return lista di `User` (può essere vuota)
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Cerca un utente per id.
     *
     * @param id identificatore dell'utente
     * @return `Optional<User>` con l'utente se trovato, altrimenti vuoto
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Crea un nuovo utente salvandolo nel repository.
     *
     * @param user entità `User` da salvare
     * @return entità `User` salvata (con id valorizzato)
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Elimina l'utente con l'id fornito.
     *
     * @param id identificatore dell'utente da eliminare
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Aggiorna i campi di un utente esistente. - Se l'utente con `id` esiste,
     * copia i campi da `updatedUser` e salva. - Se non esiste, restituisce
     * `null`.
     *
     * @param id identificatore dell'utente da aggiornare
     * @param updatedUser dati da usare per l'aggiornamento
     * @return utente aggiornato o `null` se non trovato
     */
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        }).orElse(null);
    }
}
