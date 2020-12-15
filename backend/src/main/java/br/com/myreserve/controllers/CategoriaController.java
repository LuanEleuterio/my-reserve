package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Categoria;
import br.com.myreserve.repositories.CategoriaRepository;

@CrossOrigin
@RestController
@RequestMapping("/categoria")
public class CategoriaController {
	
	@Autowired
	CategoriaRepository categoriaRepository;
	
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
	
	@PutMapping("/{idCategoria}")
	public Categoria updateCategoria(@PathVariable Integer idCategoria, @RequestBody Categoria dadosCategoria) throws Exception{
		Categoria categoriaDB = categoriaRepository.findById(idCategoria)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(dadosCategoria.getTipo_categoria() != null) categoriaDB.setTipo_categoria(dadosCategoria.getTipo_categoria());
		if(dadosCategoria.getImg_categoria() != null) categoriaDB.setImg_categoria(dadosCategoria.getImg_categoria());
		
		return categoriaRepository.save(categoriaDB);
	}
}
