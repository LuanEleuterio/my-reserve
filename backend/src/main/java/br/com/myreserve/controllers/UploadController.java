package br.com.myreserve.controllers;

import java.io.IOException;
import java.util.Date;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.myreserve.utils.UploadUtil;

@CrossOrigin
@RestController
public class UploadController {
	
	
	@PostMapping("/upload")
	public String saveFile(@RequestParam("image") MultipartFile file) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		String uploadDir = "file";
		Date date = new Date();
		String filePrefix = date.getTime() + "-";
		
		fileName = filePrefix + fileName;
		
		try {
			UploadUtil.saveFile(uploadDir, fileName, file);
		}catch(IOException e){
			System.out.print("Nao foi possivel salvar o arquivo " + e);
			return "Error: "+ e;
		}

		return uploadDir + "/" + fileName;
	}
}
