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

import br.com.myreserve.entities.DadosRecebimento;
import br.com.myreserve.repositories.DadosRecebimentoRepository;

@CrossOrigin
@RestController
@RequestMapping("/dados-recebimento")
public class DadosRecebimentoController {

	@Autowired
	DadosRecebimentoRepository recebeRepository;
	
	@GetMapping("/{id}")
	public Optional<DadosRecebimento> getDadosById(@PathVariable Integer id){
		return recebeRepository.findById(id);
	}
	
	@PostMapping()
	public void addDadosRecebe(@RequestBody DadosRecebimento dadosRecebimento) {
		recebeRepository.save(dadosRecebimento);
	}
	
	@PutMapping("/{idEstab}")
	public DadosRecebimento updateDadosRecebimento(@PathVariable Integer idEstab, @RequestBody DadosRecebimento dadosRecebimento) throws Exception{
		DadosRecebimento dadosDB = recebeRepository.findById(idEstab)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(dadosRecebimento.getNome_beneficiario() != null) dadosDB.setNome_beneficiario(dadosRecebimento.getNome_beneficiario());
		if(dadosRecebimento.getBanco() != null) dadosDB.setBanco(dadosRecebimento.getBanco());
		if(dadosRecebimento.getAgencia() != null) dadosDB.setAgencia(dadosRecebimento.getAgencia());
		if(dadosRecebimento.getConta() != null) dadosDB.setConta(dadosRecebimento.getConta());
		if(dadosRecebimento.getCpf_cnpj() != null) dadosDB.setCpf_cnpj(dadosRecebimento.getCpf_cnpj());
		
		return recebeRepository.save(dadosDB);
	}
}
