import React from 'react';
import schoolImg from '../resource/school.jpg';
import principalImg from '../resource/principal.jpg';
import teacherImg from '../resource/teacher.jpg';
import '../css/HomePage.css';

const dummyTeachers = [
  { name: 'Mrs. Sunita Sharma', subject: 'Mathematics', img: teacherImg },
  { name: 'Mr. Rajesh Verma', subject: 'Science', img: teacherImg },
  { name: 'Ms. Priya Singh', subject: 'English', img: teacherImg },
];

const HomePage = () => {
  return (
    <main className="homepage-bg">
      <section className="homepage-main">
        {/* Title + School Image */}
        <div className="homepage-row">
          <div className="homepage-col homepage-col-left">
            <h1 className="homepage-title">Koko Kendriya School, Bhopal</h1>
            <p className="homepage-lead">
              Welcome to Koko Kendriya School, Bhopal. Excellence in education,
              holistic development, and a nurturing environment for every child.
            </p>
          </div>
          <div className="homepage-col homepage-col-right">
            <img
              src={schoolImg}
              alt="School"
              className="homepage-school-img"
              style={{ maxWidth: '80%', maxHeight: '320px' }}
            />
          </div>
        </div>

        {/* Principal + Teachers */}
        <div className="homepage-row homepage-row-teachers">
          <div className="homepage-col homepage-col-principal">
            <img src={principalImg} alt="Principal" className="homepage-principal-img" />
            <h5 className="homepage-principal-name">Dr. Anil Kumar</h5>
            <div className="homepage-principal-role">Principal</div>
          </div>
          <div className="homepage-col homepage-col-teachers">
            <h4 className="homepage-teachers-title">Meet Our Teachers</h4>
            <div className="homepage-teachers-list">
              {dummyTeachers.map((teacher, idx) => (
                <article className="homepage-teacher-card" key={idx}>
                  <img src={teacher.img} alt={teacher.name} className="homepage-teacher-img" />
                  <div className="homepage-teacher-name">{teacher.name}</div>
                  <div className="homepage-teacher-subject">{teacher.subject}</div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="homepage-footer">
          <p>Koko Kendriya School, Bhopal &copy; 2025. All rights reserved.</p>
        </footer>
      </section>
    </main>
  );
};

export default HomePage;
