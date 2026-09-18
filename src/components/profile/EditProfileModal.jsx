import React, { useState } from 'react';
import { X, Save, User, MapPin, Globe, FileText, Image as ImageIcon } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const AVATAR_PRESETS = [
  'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  'https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972b3139e40d955134_full.jpg',
  'https://avatars.steamstatic.com/c5d17942e47ee20e3fb84577881c19b0d23cb602_full.jpg',
  'https://avatars.steamstatic.com/7b32be7a877ebaf1b71457fb1e51b14ea9ea0f1b_full.jpg'
];

export default function EditProfileModal({ isOpen, onClose }) {
  const { userProfile, updateUserProfile } = useNavigation();

  const [formData, setFormData] = useState({
    personaName: userProfile?.personaName || '',
    realName: userProfile?.realName || '',
    city: userProfile?.city || '',
    country: userProfile?.country || 'Brasil',
    customUrl: userProfile?.customUrl || '',
    avatarUrl: userProfile?.avatarUrl || AVATAR_PRESETS[0],
    bio: userProfile?.bio || ''
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
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
            {/* Nome de Exibição */}
            <div className="steam-form-group">
              <label className="steam-form-label">Nome de Perfil (Persona Name)</label>
              <input
                type="text"
                name="personaName"
                value={formData.personaName}
                onChange={handleChange}
                className="steam-form-input"
                placeholder="Ex: GamerDeveloper"
                required
              />
            </div>

            {/* Nome Real & Localização */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="steam-form-group">
                <label className="steam-form-label">Nome Real</label>
                <input
                  type="text"
                  name="realName"
                  value={formData.realName}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="steam-form-group">
                <label className="steam-form-label">Cidade / País</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="steam-form-input"
                  placeholder="Ex: São Paulo"
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

            {/* Escolha de Avatar */}
            <div className="steam-form-group">
              <label className="steam-form-label">Avatar Oficial Steam</label>
              <div className="steam-avatar-presets-grid">
                {AVATAR_PRESETS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`steam-avatar-preset-btn ${formData.avatarUrl === avatar ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, avatarUrl: avatar }))}
                  >
                    <img src={avatar} alt={`Avatar preset ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Biografia / Resumo */}
            <div className="steam-form-group">
              <label className="steam-form-label">Resumo / Biografia</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="steam-form-textarea"
                placeholder="Fale sobre você, sua stack, projetos e jogos favoritos..."
                rows={5}
              />
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
