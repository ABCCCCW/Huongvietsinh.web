using Microsoft.AspNetCore.Mvc;
namespace HuongVietSinh.Web.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Ecosystem() => View();
        public IActionResult Catering() => View();
        public IActionResult Events() => View();
        public IActionResult Products() => View();
    }
}
