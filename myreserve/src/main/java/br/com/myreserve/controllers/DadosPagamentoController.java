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

import br.com.myreserve.entities.DadosPagamento;
import br.com.myreserve.repositories.DadosPagamentoRepository;

@CrossOrigin
@RestController
@RequestMapping("/dados-pagamento")
public class DadosPagamentoController {

	@Autowired
	private DadosPagamentoRepository dadosPagamentoRepository;
	
	@GetMapping("{id_pag}")
	public Optional<DadosPagamento> getDadosPagamento(@PathVariable int id_pag){
		return dadosPagamentoRepository.findById(id_pag);
	}
	
	@PostMapping()
	public void addDadosPagamento(@RequestBody DadosPagamento dadosPagamento) {
		dadosPagamentoRepository.save(dadosPagamento);
	}
	
	@PutMapping("/{id_pag}")
	public DadosPagamento updateDadosPagamento(@RequestBody DadosPagamento dadosPagamento , @PathVariable int id_pag) throws Exception {
		DadosPagamento dadosPagamentoDB = dadosPagamentoRepository.findById(id_pag)
				.orElseThrow(() -> new IllegalAccessException());
		
		if(!dadosPagamento.getNumero_cartao().isEmpty()) dadosPagamento.setNumero_cartao(dadosPagamento.getNumero_cartao());
		
		if(!dadosPagamento.getData_validade().isEmpty()) dadosPagamento.setData_validade(dadosPagamento.getData_validade());
		
		if(!dadosPagamento.getCvv().isEmpty()) dadosPagamento.setCvv(dadosPagamento.getCvv());
		
		if(!dadosPagamento.getCpf().isEmpty()) dadosPagamento.setCpf(dadosPagamento.getCpf());
		
		dadosPagamentoRepository.save(dadosPagamentoDB);
		
		return dadosPagamentoDB;
	}
}
