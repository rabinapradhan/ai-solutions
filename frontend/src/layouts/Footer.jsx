import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-display font-bold">AI-SOLUTIONS</h2>

          <p class="mt-4 max-w-sm text-sm text-muted-foreground">
            Sunderland-based AI startup delivering the future of the digital
            employee experience to global industries.
          </p>
        </div>
        <div>
          <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Company
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <Link to="/about" class="text-foreground/80 hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                class="text-foreground/80 hover:text-primary"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                class="text-foreground/80 hover:text-primary active"
                to="/portfolio"
                data-status="active"
                aria-current="page"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contact" class="text-foreground/80 hover:text-primary">
                Inquiry
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Resources
          </h4>
          <ul class="space-y-2 text-sm">
            <li>
              <Link to="/blog" class="text-foreground/80 hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/events" class="text-foreground/80 hover:text-primary">
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                class="text-foreground/80 hover:text-primary"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/admin/login"
                class="text-foreground/80 hover:text-primary"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/5">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>&copy; 2026 AI-Solutions. Sunderland, UK.</p>
          <p>Engineering the digital employee experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
