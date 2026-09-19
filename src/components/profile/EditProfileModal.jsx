import React, { useState, useEffect } from 'react';
import { X, Save, User, MapPin, Globe, FileText, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const AVATAR_PRESETS = [
  'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  'https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972b3139e40d955134_full.jpg',
  'https://avatars.steamstatic.com/c5d17942e47ee20e3fb84577881c19b0d23cb602_full.jpg',
  'https://avatars.steamstatic.com/7b32be7a877ebaf1b71457fb1e51b14ea9ea0f1b_full.jpg'
];

export default function EditProfileModal({ isOpen, onClose }) {
  const { userProfile, updateUserProfile, currentUser } = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    personaName: '',
    bio: '',
    bioPhoto: AVATAR_PRESETS[0],
    avatarUrl: AVATAR_PRESETS[0],
    favoriteGame: '',
    achivimants: '',
    batches: '',
    realName: '',
    city: '',
    country: '',
    customUrl: '',
    github: '',
    linkedin: '',
    email: ''
  });

  const [isSaving, setIsSaving] = useState(false);

  // Sincroniza dados com o perfil atual ao abrir
  useEffect(() => {
    if (isOpen) {
      const currentName = userProfile?.name || userProfile?.personaName || currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : '');
      const currentAvatar = userProfile?.bioPhoto || userProfile?.avatarUrl || AVATAR_PRESETS[0];

      setFormData({
        name: currentName,
        personaName: currentName,
        bio: userProfile?.bio || '',
        bioPhoto: currentAvatar,
        avatarUrl: currentAvatar,
        favoriteGame: userProfile?.favoriteGame || '',
        achivimants: userProfile?.achivimants || '',
        batches: userProfile?.batches || '',
        realName: userProfile?.realName || '',
        city: userProfile?.city || '',
        country: userProfile?.country || '',
        customUrl: userProfile?.customUrl || '',
        github: userProfile?.socialLinks?.github || '',
        linkedin: userProfile?.socialLinks?.linkedin || '',
        email: userProfile?.socialLinks?.email || currentUser?.email || ''
      });
    }
  }, [isOpen, userProfile, currentUser]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updates = {
        name: formData.name.trim(),
        personaName: formData.name.trim(),
        bio: formData.bio.trim(),
        bioPhoto: formData.avatarUrl,
        avatarUrl: formData.avatarUrl,
        favoriteGame: formData.favoriteGame.trim(),
        achivimants: formData.achivimants.trim(),
        batches: formData.batches.trim(),
        realName: formData.realName.trim(),
        city: formData.city.trim(),
        country: formData.country.trim(),
        countryFlag: formData.country.toLowerCase().includes('brasil') || formData.country.toLowerCase().includes('brazil') ? '🇧🇷' : (formData.country ? '🌐' : ''),
        customUrl: formData.customUrl.trim(),
        socialLinks: {
          github: formData.github.trim(),
          linkedin: formData.linkedin.trim(),
          email: formData.email.trim(),
          portfolio: userProfile?.socialLinks?.portfolio || ''
        }
      };
      await updateUserProfile(updates);
      onClose();
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
    }
    setIsSaving(false);
  }

  return (
    <div className="steam-edit-profile-overlay" onClick={onClose}>
      <div className="steam-edit-profile-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="steam-edit-modal-header">
          <h2>Editar Perfil Steam</h2>
          <button className="steam-modal-close-btn" onClick={onClose} title="Fechar">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="steam-edit-modal-body">
            {/* Nome de Exibição (name / personaName) */}
            <div className="steam-form-group">
              <label className="steam-form-label">Nome de Perfil (name)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="steam-form-input"
                placeholder="Seu apelido no Steam"
                required
              />
            </div>

            {/* Jogo Favorito & Conquistas/Insígnias */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="steam-form-group">
                <label className="steam-form-label">Jogo Favorito (favoriteGame)</label>
                <input
                  type="text"
                  name="favoriteGame"
                  value={formData.favoriteGame}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Ex: Cyberpunk 2077 ou seu projeto"
                />
              </div>

              <div className="steam-form-group">
                <label className="steam-form-label">Conquistas (achivimants)</label>
                <input
                  type="text"
                  name="achivimants"
                  value={formData.achivimants}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Ex: 36 ou marcos alcançados"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="steam-form-group">
                <label className="steam-form-label">Insígnias (batches)</label>
                <input
                  type="text"
                  name="batches"
                  value={formData.batches}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Ex: 5 ou nomes de insígnias"
                />
              </div>

              <div className="steam-form-group">
                <label className="steam-form-label">Nome Real (realName)</label>
                <input
                  type="text"
                  name="realName"
                  value={formData.realName}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            {/* Localização */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="steam-form-group">
                <label className="steam-form-label">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Sua cidade"
                />
              </div>

              <div className="steam-form-group">
                <label className="steam-form-label">País</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Seu país (ex: Brasil)"
                />
              </div>
            </div>

            {/* URL Personalizada */}
            <div className="steam-form-group">
              <label className="steam-form-label">URL Personalizada</label>
              <input
                type="text"
                name="customUrl"
                value={formData.customUrl}
                onChange={handleChange}
                className="steam-form-input"
                placeholder="steamcommunity.com/id/seunick"
              />
            </div>

            {/* Escolha de Avatar (bioPhoto) */}
            <div className="steam-form-group">
              <label className="steam-form-label">Avatar Oficial Steam (bioPhoto)</label>
              <div className="steam-avatar-presets-grid">
                {AVATAR_PRESETS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`steam-avatar-preset-btn ${formData.avatarUrl === avatar ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, avatarUrl: avatar, bioPhoto: avatar }))}
                  >
                    <img src={avatar} alt={`Avatar preset ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Biografia / Resumo (bio) */}
            <div className="steam-form-group">
              <label className="steam-form-label">Resumo / Biografia (bio)</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="steam-form-textarea"
                placeholder="Fale sobre você, sua stack de desenvolvimento, projetos ou jogos favoritos..."
                rows={4}
              />
            </div>

            {/* Links Profissionais */}
            <div style={{ borderTop: '1px solid rgba(84, 133, 166, 0.2)', paddingTop: '14px', marginTop: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#66c0f4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Conexões & Redes (Opcional)
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
                <div className="steam-form-group">
                  <label className="steam-form-label">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="steam-form-input"
                    placeholder="https://github.com/seunome"
                  />
                </div>

                <div className="steam-form-group">
                  <label className="steam-form-label">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="steam-form-input"
                    placeholder="https://linkedin.com/in/seunome"
                  />
                </div>
              </div>

              <div className="steam-form-group">
                <label className="steam-form-label">E-mail Profissional</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="contato@exemplo.com"
                />
              </div>
            </div>
          </div>

          <div className="steam-edit-modal-footer">
            <button type="button" className="steam-btn-cancel" onClick={onClose} disabled={isSaving}>
              Cancelar
            </button>
            <button type="submit" className="steam-btn-save-profile" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
