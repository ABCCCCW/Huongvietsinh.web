using System.ComponentModel.DataAnnotations;

namespace HuongVietSinh.Web.Models;

public class ContactRequest
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Vui lòng nhập họ tên")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
    [Phone]
    public string Phone { get; set; } = string.Empty;

    [EmailAddress]
    public string? Email { get; set; }

    public string? Organization { get; set; }
    public string? Message { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
