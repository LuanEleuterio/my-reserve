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

import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.repositories.EstabelecimentoRepository;

@RestController
@RequestMapping("/restaurante")
public class EstabelecimentoController {
	
	@Autowired
	EstabelecimentoRepository estabelecimentoRepository;
	
	@GetMapping()
	public Iterable<Estabelecimento> getEstabelecimentos(){
		return estabelecimentoRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Estabelecimento> getById(@PathVariable int id) {
		return estabelecimentoRepository.findById(id);
	}
	
	@PostMapping()
	public void addEstabelecimento(@RequestBody Estabelecimento estabelecimento) {
		estabelecimentoRepository.save(estabelecimento);
	}
	
	@PutMapping("/{idEstab}")
	public Estabelecimento updateEstab(@PathVariable int idEstab, @RequestBody Estabelecimento dadosEstab) throws Exception{
		Estabelecimento estabDB = estabelecimentoRepository.findById(idEstab)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosEstab.getNome_estabelecimento() != null) estabDB.setNome_estabelecimento(dadosEstab.getNome_estabelecimento());
		if(dadosEstab.getHora_funcionamento() != null) estabDB.setHora_funcionamento(dadosEstab.getHora_funcionamento());
		if(dadosEstab.getImg_estabelecimento() != null) estabDB.setImg_estabelecimento(dadosEstab.getImg_estabelecimento());
		if(dadosEstab.getDescricao() != null) estabDB.setDescricao(dadosEstab.getDescricao());
		if(dadosEstab.getMax_pessoas() != null) estabDB.setMax_pessoas(dadosEstab.getMax_pessoas());
		//if(dadosEstab.getFk_categoria() != null) estabDB.setFk_categoria(dadosEstab.getFk_categoria());
		return estabelecimentoRepository.save(estabDB);
	}
	
}
