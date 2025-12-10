import { useState } from 'react';
import { Linkedin, X } from 'lucide-react';
import '../styles/ExecutiveBoard.css';

const boardMembers = [
  {
    id: 1,
    name: "Alex Ventura",
    title: "President",
    image: "/img/ALEX_V.jpg",
    linkedin: "https://www.linkedin.com/in/ventura-alex/",
    bio: "Bio goes here. "
  },
  {
    id: 2,
    name: "Ingrid Martinez-Rojas",
    title: "Vice President",
    image: "/img/INGRID_MR.jpg",
    linkedin: "https://www.linkedin.com/in/ingrid-martinez-rojas-8a6b12179/",
    bio: "Michael specializes in strategic planning and operational excellence, bringing a data-driven approach to executive decision-making."
  },
  {
    id: 3,
    name: "Rodrigo Machuca",
    title: "Executive Secretary",
    image: "/img/RODRIGO_M.jpg",
    linkedin: "https://www.linkedin.com/in/rodrigo-machuca-4a1b85215/",
    bio: "Sarah is a certified financial expert with a track record of managing multi-million dollar budgets and ensuring fiscal responsibility."
  },
  {
    id: 4,
    name: "Nahomy Sofia Zuniga",
    title: "Treasurer",
    image: "/img/NAHOMY.jpg",
    linkedin: "https://www.linkedin.com/in/nahomyzuniga/",
    bio: "David brings exceptional organizational skills and attention to detail, ensuring seamless communication and documentation."
  },
  {
    id: 5,
    name: "Angel Cazares",
    title: "Director of Fundraising",
    image: "/img/ANGEL_C.jpg",
    linkedin: "https://www.linkedin.com/in/angel-cazares-ajc253/",
    bio: "Emily is a creative marketing strategist with expertise in brand development and digital marketing campaigns."
  },
  {
    id: 6,
    name: "Riannon Nydick",
    title: "Director of Information Technology",
    image: "/img/RIANNON.jpg",
    linkedin: "https://www.linkedin.com/in/riannon-nydick/",
    bio: "James excels in streamlining operations and implementing efficient processes that drive organizational success."
  },
  {
    id: 7,
    name: "Joe Pomavilla",
    title: "Director of Marketing",
    image: "/img/JOE_P.jpg",
    linkedin: "https://www.linkedin.com/in/joe-pomavilla/",
    bio: "Lisa has coordinated over 100 successful events, creating memorable experiences that bring communities together."
  },
  {
    id: 8,
    name: "Andrey Diaz-Ortega",
    title: "Director of Community Service",
    image: "/img/ANDREY_D.jpg",
    linkedin: "https://www.linkedin.com/in/aad94/",
    bio: "Robert is a tech innovator who leads digital transformation initiatives and oversees technology infrastructure."
  },
  {
    id: 9,
    name: "Andrea Pardo",
    title: "Director of Professional Development",
    image: "/img/ANDREA_P.jpg",
    linkedin: "https://www.linkedin.com/in/andreacpardo/",
    bio: "Amanda champions workplace culture and talent development, building strong teams through strategic HR practices."
  },
  {
    id: 10,
    name: "Samuel Gutierrez",
    title: "Director of Events",
    image: "/img/SAM_G.jpg",
    linkedin: "https://www.linkedin.com/in/samuel-gutierrez-7a6973294/",
    bio: "Christopher manages media relations and external communications, shaping the organization's public image."
  },
  {
    id: 11,
    name: "Justin Argueta",
    title: "Director of Membership",
    image: "/img/JUSTIN_A.jpg",
    linkedin: "https://www.linkedin.com/in/justin-argueta-391b81281/",
    bio: "Jennifer builds meaningful partnerships with community organizations and leads social impact initiatives."
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
                />
              </div>
              
              <div className="modal-info">
                <h3 className="modal-name">{selectedMember.name}</h3>
                <p className="modal-title">{selectedMember.title}</p>
                
                <div className="modal-bio-section">
                  <h4 className="bio-heading">About</h4>
                  <p className="bio-text">{selectedMember.bio}</p>
                </div>
                
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