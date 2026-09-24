import { useState } from 'react';
import { Linkedin, X } from 'lucide-react';
import '../styles/ExecutiveBoard.css';

const boardMembers = [
  {
    id: 1,
    name: "Ingrid Martinez-Rojas",
    title: "President",
    image: "img/Ingrid-Martinez-Rojas.jpg",
    imagePosition: "center top",
    linkedin: "https://www.linkedin.com/in/ingridmartinezrojas/",
    //bio: "Bio goes here. "
  },
  {
    id: 2,
    name: "Andrea Camila Pardo",
    title: "Vice President",
    image: "img/Andrea-Camila-Pardo.jpg",
    linkedin: "https://www.linkedin.com/in/andreacpardo/",
    //bio: "Michael specializes in strategic planning and operational excellence, bringing a data-driven approach to executive decision-making."
  },
  {
    id: 3,
    name: "Anwesha Biswal",
    title: "Executive Secretary",
    image: "img/Anwesha-Biswal.jpg",
    linkedin: "https://www.linkedin.com/in/anwesha-b-673308322/",
    bio: "Sarah is a certified financial expert with a track record of managing multi-million dollar budgets and ensuring fiscal responsibility."
  },
  {
    id: 4,
    name: "Angelo Bustamante",
    title: "Treasurer",
    image: "img/Angelo-Bustamante.jpg",
    imagePosition: "center top",
    linkedin: "https://www.linkedin.com/in/angelobustamante/",
    //bio: "David brings exceptional organizational skills and attention to detail, ensuring seamless communication and documentation."
  },
  {
    id: 5,
    name: "Jose Trujillo",
    title: "Director of Fundraising",
    image: "img/Jose-Trujillo.jpg",
    linkedin: "https://www.linkedin.com/in/jhtrujillo/",
   // bio: "Emily is a creative marketing strategist with expertise in brand development and digital marketing campaigns."
  },
  {
    id: 6,
    name: "Anabhayan Ahruran",
    title: "Director of Information Technology",
    image: "img/anabhayan-ahruran.jpg",
    linkedin: "https://www.linkedin.com/in/anabhayan-ahruran2027/",
    //bio: "James excels in streamlining operations and implementing efficient processes that drive organizational success."
  },
  {
    id: 7,
    name: "Brandon Palacios",
    title: "Director of Marketing",
    image: "img/Brandon-Palacios.jpg",
    linkedin: "https://www.linkedin.com/in/brandon-palacios-5827aa244/",
    // bio: "Lisa has coordinated over 100 successful events, creating memorable experiences that bring communities together."
  },
  {
    id: 8,
    name: "Andrey Diaz-Ortega",
    title: "Director of Community Service",
    image: "img/Andrey-Diaz-Ortega.jpg",
    linkedin: "https://www.linkedin.com/in/aad94/",
    //bio: "Robert is a tech innovator who leads digital transformation initiatives and oversees technology infrastructure."
  },
  {
    id: 9,
    name: "Renzo Rey",
    title: "Director of Professional Development",
    image: "img/Renzo-Rey.jpg",
    imagePosition: "center top",
    linkedin: "https://www.linkedin.com/in/renzo-rey/",
    //bio: "Amanda champions workplace culture and talent development, building strong teams through strategic HR practices."
  },
  {
    id: 10,
    name: "Nayeli Moranchel",
    title: "Director of Events",
    image: "img/Nayeli-Morachel.jpg",
    linkedin: "https://www.linkedin.com/in/nayeli-moranchel/",
    //bio: "Christopher manages media relations and external communications, shaping the organization's public image."
  },
  {
    id: 11,
    name: "Justin Argueta",
    title: "Director of Membership",
    image: "img/Justin-Aguerta.jpg",
    linkedin: "https://www.linkedin.com/in/justin-argueta-391b81281/",
   // bio: "Jennifer builds meaningful partnerships with community organizations and leads social impact initiatives."
  }
];
function ExecutiveBoard() {
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section id="executive-board-section" className="executive-board-section">
      <div className="executive-container">
        <h2 className="executive-title">Executive Board</h2>
        
        <div className="board-grid">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => openModal(member)}
              className="board-card"
            >
              <div className="card-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-image"
                  style={{ objectPosition: member.imagePosition }}
                />
              </div>
              
              <div className="card-content">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-title">{member.title}</p>
                
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="linkedin-button"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close">
              <X size={24} />
            </button>
            
            <div className="modal-inner">
              <div className="modal-image-wrapper">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="modal-image"
                  style={{ objectPosition: selectedMember.imagePosition }}
                />
              </div>
              
              <div className="modal-info">
                <h3 className="modal-name">{selectedMember.name}</h3>
                <p className="modal-title">{selectedMember.title}</p>
                
                
                
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-linkedin-button"
                >
                  <Linkedin size={20} />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ExecutiveBoard;
