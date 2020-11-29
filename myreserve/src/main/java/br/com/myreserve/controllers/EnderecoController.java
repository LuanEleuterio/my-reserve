package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Endereco;
import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.repositories.EnderecoRepository;

@CrossOrigin
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
	
	@PutMapping("/{id_endereco}")
	public Endereco updateEndereco(@PathVariable int id_endereco, @RequestBody Endereco dadosEndereco) throws Exception{
		Endereco enderecoDB = enderecoRepository.findById(id_endereco)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosEndereco.getEstado() != null) enderecoDB.setEstado(dadosEndereco.getEstado());
		if(dadosEndereco.getCidade() != null) enderecoDB.setCidade(dadosEndereco.getCidade());
		if(dadosEndereco.getBairro() != null) enderecoDB.setBairro(dadosEndereco.getBairro());
		if(dadosEndereco.getCep() != null) enderecoDB.setCep(dadosEndereco.getCep());
		if(dadosEndereco.getLogradouro() != null) enderecoDB.setLogradouro(dadosEndereco.getLogradouro());
		if(dadosEndereco.getNumero() != null) enderecoDB.setNumero(dadosEndereco.getNumero());
		return enderecoRepository.save(enderecoDB);
	}
	
}
