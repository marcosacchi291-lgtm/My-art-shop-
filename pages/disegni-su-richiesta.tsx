'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MedievalSharp } from 'next/font/google';
import styles from './DisegniRichiesta.module.css';

const medieval = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});

const DisegniSuRichiesta = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    descrizione: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dati del modulo:', formData);
    alert('Richiesta inviata con successo!');
    setFormData({
      nome: '',
      email: '',
      descrizione: '',
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Disegni su Richiesta</title>
      </Head>
      <main className={styles.main}>
        <Link href="/" className={`${styles.backLink} ${medieval.className}`}>
          &larr; Torna alla Home
        </Link>
        <h1 className={`${styles.title} ${medieval.className}`}>Richiedi un Disegno</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nome" className={medieval.className}>Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={medieval.className}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descrizione" className={medieval.className}>Descrivi la tua idea:</label>
            <textarea
              id="descrizione"
              name="descrizione"
              rows={6}
              value={formData.descrizione}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={`${styles.submitButton} ${medieval.className}`}>
            Invia Richiesta
          </button>
        </form>
      </main>
    </div>
  );
};

export default DisegniSuRichiesta;