import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function ProfileComments() {
  const { profileComments, postProfileComment, currentUser, userProfile } = useNavigation();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Avatar de quem está comentando
  const myAvatar = userProfile?.avatarUrl || currentUser?.photoURL || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await postProfileComment(commentText);
      setCommentText('');
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
    }
    setIsSubmitting(false);
  }

  const comments = profileComments || [];

  return (
    <div className="steam-comments-wall-box">
      <div className="steam-comments-wall-header">
        <h2>
          Comentários ({comments.length})
        </h2>
        <span style={{ fontSize: '11px', color: '#8f98a0' }}>
          Deixe sua recomendação (+rep)
        </span>
      </div>

      <div className="steam-comments-wall-body">
        {/* Formulário de Novo Comentário */}
        <div className="steam-comment-input-area">
          <img
            src={myAvatar}
            alt="Seu avatar"
            className="steam-comment-author-avatar"
          />

          <form className="steam-comment-form" onSubmit={handleSubmit}>
            <textarea
              className="steam-comment-textarea"
              placeholder="Adicionar um comentário ou recomendação ao perfil (+rep)..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isSubmitting}
            />

            <div className="steam-comment-form-actions">
              <button
                type="submit"
                className="steam-btn-post-comment"
                disabled={!commentText.trim() || isSubmitting}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar comentário'}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Comentários do Mural */}
        <div className="steam-comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="steam-comment-row">
              <img
                src={comment.authorAvatar || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg'}
                alt={comment.authorName}
                className="steam-comment-user-avatar"
              />

              <div className="steam-comment-content">
                <div className="steam-comment-author-bar">
                  <div className="steam-comment-author-name">
                    <span>{comment.authorName}</span>
                    {comment.authorBadge && (
                      <span className="steam-comment-badge-tag">{comment.authorBadge}</span>
                    )}
                  </div>
                  <span className="steam-comment-date">{comment.createdAt}</span>
                </div>

                <div className="steam-comment-body-text">
                  {comment.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
