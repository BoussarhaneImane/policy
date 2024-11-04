import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-800  text-white p-10 mt-36">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Omnipilote. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
