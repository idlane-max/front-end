import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const EMAIL = "example@gmail.com";

const Verify = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(90);
  const [loading, setLoading] = useState(false);
  const [btnMsg, setBtnMsg] = useState(null);
  const [resendEnabled, setResendEnabled] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate(); // Initialisez useNavigate

  // Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      setResendEnabled(false);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  // Format mm:ss
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Input change
  const handleInput = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const newCode = [...code];
    newCode[i] = val;
    setCode(newCode);
    if (val && i < 3) inputRefs[i + 1].current.focus();
  };

  // Keyboard navigation
  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputRefs[i - 1].current.focus();
    }
  };

  // Keypad click
  const handleKeypad = (val) => {
    if (!/^\d$/.test(val)) return;
    const idx = code.findIndex(c => c === '');
    if (idx !== -1) {
      const newCode = [...code];
      newCode[idx] = val;
      setCode(newCode);
      inputRefs[idx].current.focus();
    }
  };

  // Backspace keypad
  const handleBackspace = () => {
    const idx = [...code].reverse().findIndex(c => c !== '');
    if (idx !== -1) {
      const realIdx = 3 - idx;
      const newCode = [...code];
      newCode[realIdx] = '';
      setCode(newCode);
      inputRefs[realIdx].current.focus();
    }
  };

  // Resend
  const handleResend = () => {
    alert('Un nouveau code a été envoyé à votre adresse email.');
    setTimer(90);
    setCode(['', '', '', '']);
    inputRefs[0].current.focus();
  };

  // Vérifier
  const handleVerify = () => {
    if (code.join('').length === 4) {
      setLoading(true);
      setBtnMsg(<><i className="fas fa-spinner fa-spin"></i> Vérification...</>);
      setTimeout(() => {
        setLoading(false);
        setBtnMsg(null);
        alert('Code vérifié avec succès ! Redirection vers la page principale...');
        // Rediriger vers la page /page-principale
        navigate('/page-principale'); 
      }, 1500);
    } else {
      setBtnMsg(<><i className="fas fa-exclamation-circle"></i> Code incomplet</>);
      setTimeout(() => setBtnMsg(null), 2000);
    }
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <h1 style={styles.title}>Vérification du compte</h1>
        <p style={styles.subtitle}>
          Veuillez entrer le code de vérification envoyé à <strong>{EMAIL}</strong>
        </p>
        <div style={styles.codeInputs}>
          {code.map((c, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              maxLength={1}
              style={styles.codeInput}
              value={c}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
            />
          ))}
        </div>
        <div style={styles.timerRow}>
          <span style={styles.timer}>{formatTime(timer)}</span>
          <button
            style={{
              ...styles.resendBtn,
              ...(resendEnabled ? {} : styles.resendBtnDisabled)
            }}
            onClick={handleResend}
            disabled={!resendEnabled}
          >
            Vous n'avez pas reçu le code ? <span>Renvoyer</span>
          </button>
        </div>
        <div style={styles.keypadSection}>
          <button
            style={styles.verifyBtn}
            onClick={handleVerify}
            disabled={loading}
          >
            <i className="fas fa-check-circle"></i>
            {btnMsg ? btnMsg : 'Vérifier'}
          </button>
          <div style={styles.keypadGrid}>
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <button
                key={n}
                style={styles.keyBtn}
                onClick={() => handleKeypad(n.toString())}
                type="button"
              >
                {n}
              </button>
            ))}
          </div>
          <div style={styles.keypadGrid}>
            <button style={styles.keyBtn} type="button" disabled>.</button>
            <button style={styles.keyBtn} onClick={() => handleKeypad('0')} type="button">0</button>
            <button style={styles.keyBtn} onClick={handleBackspace} type="button">
              <i className="fas fa-backspace"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  bg: {
    minHeight: '100vh',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '2.5rem',
    width: '100%',
    maxWidth: 450,
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#7c3aed',
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  codeInputs: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  codeInput: {
    width: '3.5rem',
    height: '3.5rem',
    border: '2px solid #e5e7eb',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 600,
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  timerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  timer: {
    color: '#6b7280',
    fontSize: '1rem',
  },
  resendBtn: {
    background: 'none',
    border: 'none',
    color: '#7c3aed',
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: '1rem',
    padding: 0,
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  },
  resendBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    textDecoration: 'none',
  },
  keypadSection: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '1.5rem',
  },
  verifyBtn: {
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    padding: '1rem',
    width: '100%',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '1.5rem',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  keypadGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  keyBtn: {
    width: '100%',
    height: '3.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    fontSize: '1.25rem',
    fontWeight: 500,
    background: '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Verify;