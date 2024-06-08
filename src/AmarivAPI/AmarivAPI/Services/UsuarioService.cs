﻿using AmarivAPI.Data.Dtos;
using AmarivAPI.Data.Requests;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using System.Web;

namespace AmarivAPI.Services
{
    public class UsuarioService
    {
        private IMapper _mapper;
        private UserManager<Usuario> _userManager;
        private SignInManager<Usuario> _signInManager;
        private TokenService _tokenService;
        private EmailService _emailService;
        private RoleManager<IdentityRole> _roleManager;


        public UsuarioService(IMapper mapper, UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, TokenService tokenService, EmailService emailService, RoleManager<IdentityRole> roleManager)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _roleManager = roleManager;
          
        }

        public Usuario RecuperaUsuarioPorEmail(string email)
        {
            return _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.NormalizedUserName == email.ToUpper());
        }

        public async Task<Result> CadastraCliente(CreateUsuarioDto createDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(createDto);
            IdentityResult resultado = await _userManager.CreateAsync(usuario, createDto.Password);
            await _userManager.AddToRoleAsync(usuario, "cliente");
            if(resultado.Succeeded) 
            {
                var identityUser = RecuperaUsuarioPorEmail(createDto.Email);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                _emailService.EnviarEmailConfirmacao(new[] {identityUser.Email}, "Confirme seu email", identityUser.Id, code);
                return Result.Ok().WithSuccess("Usuário cadastrado com sucesso!");
            }
            return Result.Fail("Falha ao cadastrar usuário");
        }

        public async Task<Result> CadastraFuncionario(CreateUsuarioDto createDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(createDto);
            IdentityResult resultado = await _userManager.CreateAsync(usuario, createDto.Password);
            await _userManager.AddToRoleAsync(usuario, "funcionario");
            if (resultado.Succeeded)
            {
                var identityUser = RecuperaUsuarioPorEmail(createDto.Email);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                _emailService.EnviarEmailConfirmacao(new[] { identityUser.Email }, "Confirme seu email", identityUser.Id, code);
                return Result.Ok().WithSuccess("Usuário cadastrado com sucesso!");
            }
            return Result.Fail("Falha ao cadastrar usuário");
        }

        public Result LogaUsuario(LoginRequest request)
        { 
            Task<SignInResult> resultado = _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if(resultado.Result.Succeeded)
            {
                var identityUser = RecuperaUsuarioPorEmail(request.Email);

                Token token = _tokenService.CreateToken(identityUser, _signInManager.UserManager.GetRolesAsync(identityUser).Result.FirstOrDefault());

                return Result.Ok().WithSuccess(token.Value);
            }
            return Result.Fail("Falha ao logar");
        }

        public Result Logout()
        {
            var resultado = _signInManager.SignOutAsync();
            if(resultado.IsCompletedSuccessfully)
            {
                return Result.Ok();
            }
            return Result.Fail("Logout falhou");
        }

        public Result ConfirmaEmail(ConfirmaEmailRequest request)
        {
            var identityUser = _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.Id == request.UsuarioId);

            var identityResult = _userManager.ConfirmEmailAsync(identityUser, request.CodigoAtivacao);
            if(identityResult.Result.Succeeded)
            {
                return Result.Ok().WithSuccess("Email confirmado com sucesso!");
            }
            return Result.Fail("Falha ao confirmar email");
        }

        public Result SolicitaRecuperacao(SolicitaRecuperacaoRequest request)
        {
            var identityUser = RecuperaUsuarioPorEmail(request.Email);

            if(identityUser != null)
            {
                string codigoDeRecuperacao = _signInManager.UserManager.GeneratePasswordResetTokenAsync(identityUser).Result;
                _emailService.EnviarEmailRecuperacao(identityUser.Email, "Recupere sua senha", codigoDeRecuperacao);
                return Result.Ok().WithSuccess("Solicitacao realizada com sucesso!");
            }
            return Result.Fail("Falha ao solicitar recuperacao");
        }

        public async Task<Result> SolicitaConfirmacao(SolicitaConfirmacaoRequest request)
        {
            var identityUser = RecuperaUsuarioPorEmail(request.Email);

            if (identityUser != null)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                _emailService.EnviarEmailConfirmacao(new[] { identityUser.Email }, "Confirme seu email", identityUser.Id, code);
                return Result.Ok().WithSuccess("Solicitacao realizada com sucesso!");
            }
            return Result.Fail("Falha ao solicitar confirmacao");

        }

        public Result RecuperaSenha(RecuperaSenhaRequest request)
        {
            var identityUser = RecuperaUsuarioPorEmail(request.Email);

            var identityResult = _userManager.ResetPasswordAsync(identityUser, request.CodigoRecuperacao, request.Password).Result;
            if (identityResult.Succeeded)
            {
                return Result.Ok().WithSuccess("Senha redefinida com sucesso!");
            }
            return Result.Fail("Falha ao recuperar senha");
        }
    }
}
