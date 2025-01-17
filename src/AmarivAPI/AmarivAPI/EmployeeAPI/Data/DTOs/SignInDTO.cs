﻿using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.EmployeeAPI.Data.DTOs
{
    public class SignInDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
