// component/footer/Footer.tsx

import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Vladislav Kotiash</p>
          <p>
            Contact us:
            <a href="mailto:vvllaadd73@gmail.com">vvllaadd73@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}