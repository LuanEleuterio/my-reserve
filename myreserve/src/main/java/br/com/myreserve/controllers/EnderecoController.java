package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Endereco;
import br.com.myreserve.repositories.EnderecoRepository;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

	@Autowired
	EnderecoRepository enderecoRepository;
	
	@GetMapping()
	public Iterable<Endereco> getEnderecos(){
		return enderecoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Endereco> getById(@PathVariable int id) {
		return enderecoRepository.findById(id);
	}
	
	@PostMapping()
	public void addEndereco(@RequestBody Endereco endereco) {
		enderecoRepository.save(endereco);
	}
	
}
