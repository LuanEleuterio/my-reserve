package br.com.myreserve.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.myreserve.dto.CredenciaisDTO;
import br.com.myreserve.dto.TokenDTO;
import br.com.myreserve.entities.Estabelecimento;
import br.com.myreserve.exceptions.SenhaInvalidaException;
import br.com.myreserve.repositories.CategoriaRepository;
import br.com.myreserve.repositories.EstabelecimentoRepository;
import br.com.myreserve.services.EstabelecimentoService;
import br.com.myreserve.services.JwtService;
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
	EstabelecimentoService estabelecimentoService;
	@Autowired
	JwtService jwtService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping()
	public Iterable<Estabelecimento> getEstabelecimentos(Pageable pageable){
		return estabelecimentoRepository.findAll(pageable);
	}
	
	@GetMapping("/{id}")
	public Optional<Estabelecimento> getById(@PathVariable int id) {
		return estabelecimentoRepository.findById(id);
	}
	
	@PostMapping()
	public Estabelecimento addEstabelecimento(@RequestBody Estabelecimento estabelecimento) {
		String senhaCriptografada = passwordEncoder.encode(estabelecimento.getSenha()); 
		estabelecimento.setSenha(senhaCriptografada);
		return estabelecimentoRepository.save(estabelecimento);
	}
	
	@PostMapping("/auth")
	public TokenDTO autenticar(@RequestBody CredenciaisDTO credenciais) {
		try {
			Estabelecimento estab = Estabelecimento.builder()
												.email(credenciais.getLogin())
												.senha(credenciais.getSenha())
												.build();
			
			estabelecimentoService.autenticar(estab);
			String token = jwtService.gerarToken(estab);
			return new TokenDTO(estab.getEmail(), token);
		}catch(UsernameNotFoundException | SenhaInvalidaException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
		}
	}
	
	@PutMapping("/{idEstab}")
	public Estabelecimento updateEstab(@PathVariable int idEstab, @RequestBody Estabelecimento dadosEstab) throws Exception{
		Estabelecimento estabDB = estabelecimentoRepository.findById(idEstab)
				.orElseThrow(() -> new IllegalAccessException());
		if(dadosEstab.getNome() != null) estabDB.setNome(dadosEstab.getNome());
		if(dadosEstab.getHora_funcionamento() != null) estabDB.setHora_funcionamento(dadosEstab.getHora_funcionamento());
		if(dadosEstab.getImg_estabelecimento() != null) estabDB.setImg_estabelecimento(dadosEstab.getImg_estabelecimento());
		if(dadosEstab.getDescricao() != null) estabDB.setDescricao(dadosEstab.getDescricao());
		if(dadosEstab.getMax_pessoas() != null) estabDB.setMax_pessoas(dadosEstab.getMax_pessoas());
		if(dadosEstab.getFk_categoria() != null) estabDB.setFk_categoria(dadosEstab.getFk_categoria());
		if(dadosEstab.getSenha() != null) estabDB.setSenha(passwordEncoder.encode(dadosEstab.getSenha()));
		return estabelecimentoRepository.save(estabDB);
	}
	
}
