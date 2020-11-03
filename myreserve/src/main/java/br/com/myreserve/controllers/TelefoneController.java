package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Telefone;
import br.com.myreserve.repositories.TelefoneRepository;

@RestController
@RequestMapping("/telefone")
public class TelefoneController {
	
	@Autowired
	TelefoneRepository telefoneRepository;
	
	@GetMapping()
	public Iterable<Telefone> getTelefones(){
		return telefoneRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Telefone> getTelefoneById(@PathVariable Integer id){
		return telefoneRepository.findById(id);
	}
	
}
