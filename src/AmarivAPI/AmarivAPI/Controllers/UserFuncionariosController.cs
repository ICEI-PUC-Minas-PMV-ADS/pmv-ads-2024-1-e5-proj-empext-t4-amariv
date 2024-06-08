﻿using AmarivAPI.EmployeeAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [ApiController]
    public class UserFuncionariosController : Controller
    {
        private readonly UserService _userService;

        public UserFuncionariosController(UserService userService)
        {
            _userService = userService;
        }

        [Route("GetFuncionarios")]
        [HttpGet]
        async public Task<IActionResult> GetFuncionarios()
        {
            var funcionarios = await _userService.GetFuncionarios();
            return Ok(funcionarios.Value);
        }
    }
}
