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

import br.com.myreserve.entities.CancelJustifica;
import br.com.myreserve.repositories.CancelJustificaRepository;

@RestController
@RequestMapping("/cancel-justifica")
public class CancelJustificaController {
	
	@Autowired
	private CancelJustificaRepository cancelJustificaRepository;
	
	@GetMapping({"/{id_cancel}"})
	public Optional<CancelJustifica> getCancelamento(@PathVariable int id_cancel){
		return cancelJustificaRepository.findById(id_cancel);
	}
	
	@PostMapping()
	public void addCancelamento(@RequestBody CancelJustifica cancelJustifica) {
		cancelJustificaRepository.save(cancelJustifica);
	}

	
}
