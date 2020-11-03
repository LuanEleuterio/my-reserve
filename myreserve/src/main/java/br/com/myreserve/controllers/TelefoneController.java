package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping()
	public void addTelefone(@RequestBody Telefone telefone) {
		telefoneRepository.save(telefone);
	}
	
	@PutMapping("/{idEstab}")
	public Telefone updateTelefone(@PathVariable Integer idEstab, @RequestBody Telefone dadosTelefone) throws Exception{
		Telefone telefoneDB = telefoneRepository.findOneByFk_estabelecimento(idEstab);
		
		if(dadosTelefone.getDdd() != null) telefoneDB.setDdd(dadosTelefone.getDdd());
		if(dadosTelefone.getNumero() != null) telefoneDB.setNumero(dadosTelefone.getNumero());
		
		return telefoneRepository.save(telefoneDB);
	}
}