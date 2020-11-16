package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.entities.Logins;
import br.com.myreserve.repositories.CategoriaRepository;
import br.com.myreserve.repositories.EstabelecimentoRepository;
import br.com.myreserve.repositories.HorarioRepository;
import br.com.myreserve.repositories.LoginsRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/restaurante")
@RequiredArgsConstructor
public class EstabelecimentoController {
	
	@Autowired
	EstabelecimentoRepository estabelecimentoRepository;
	@Autowired
	CategoriaRepository categoriaRepository;
	@Autowired
	HorarioRepository horarioRepository;
	@Autowired
	LoginsRepository loginsRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@CrossOrigin
	@GetMapping()
	public Iterable<Estabelecimento> getEstabelecimentos(Pageable pageable){
		return estabelecimentoRepository.findAll(pageable);
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public Optional<Estabelecimento> getById(@PathVariable int id) {
		return estabelecimentoRepository.findById(id);
	}
	
	@CrossOrigin
	@PostMapping()
	public Integer addEstabelecimento(@RequestBody Estabelecimento estabelecimento) {
		Logins login = new Logins();
		
		String senhaCriptografada = passwordEncoder.encode(estabelecimento.getSenha()); 
		
		estabelecimento.setSenha(senhaCriptografada);
		estabelecimento.setEstab_ativo(true);
		estabelecimentoRepository.save(estabelecimento);
		
		login.setEmail(estabelecimento.getEmail());
		login.setSenha(senhaCriptografada);
		login.setIdEstabelecimento(estabelecimento.getId_estabelecimento());
		loginsRepository.save(login);
		
		return estabelecimento.getId_estabelecimento();
	}
	
	@CrossOrigin
	@PutMapping("/{idEstab}")
	public Estabelecimento updateEstab(@PathVariable Integer idEstab, @RequestBody Estabelecimento dadosEstab) throws Exception{
		Estabelecimento estabDB = estabelecimentoRepository.findById(idEstab)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosEstab.getNome() != null) estabDB.setNome(dadosEstab.getNome());
		if(dadosEstab.getHora_funcionamento() != null) estabDB.setHora_funcionamento(dadosEstab.getHora_funcionamento());
		if(dadosEstab.getImg_estabelecimento() != null) estabDB.setImg_estabelecimento(dadosEstab.getImg_estabelecimento());
		if(dadosEstab.getDescricao() != null) estabDB.setDescricao(dadosEstab.getDescricao());
		if(dadosEstab.getMax_pessoas() != null) { 
			estabDB.setMax_pessoas(dadosEstab.getMax_pessoas());
			horarioRepository.updateQtdPessoaByFk(dadosEstab.getMax_pessoas(), idEstab);
			}
		if(dadosEstab.getFk_categoria() != null) estabDB.setFk_categoria(dadosEstab.getFk_categoria());
		if(dadosEstab.getSenha() != null) {
			String newPassword = passwordEncoder.encode(dadosEstab.getSenha());
			
			estabDB.setSenha(newPassword);
			
			Logins login = loginsRepository.findOneByIdEstabelecimento(idEstab)
					.orElseThrow(() -> new IllegalAccessException());
			
			login.setSenha(newPassword);
			
			loginsRepository.save(login);
		};
		return estabelecimentoRepository.save(estabDB);
	}
	
}
