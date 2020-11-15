package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Categoria;
import br.com.myreserve.repositories.CategoriaRepository;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
	
	@Autowired
	CategoriaRepository categoriaRepository;
	
	@CrossOrigin
	@GetMapping()
	public Iterable<Categoria> getCategorias(){
		return categoriaRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Categoria> getCategoriaById(@PathVariable Integer id){
		return categoriaRepository.findById(id);
	}
	
	@PostMapping()
	public void addCategoria(@RequestBody Categoria categoria) {
		categoriaRepository.save(categoria);
	}
}
