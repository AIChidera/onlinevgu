/* global React, HomePage, ProgramDetail, LeadPage, Header, Footer, FloatingChat, StickyApply, LeadModal */
const { useState } = React;

const App = () => {
  const [page, setPage] = useState('home');
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadProgram, setLeadProgram] = useState(null);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openLeadModal = (program) => {
    setLeadProgram(typeof program === 'string' ? program : null);
    setLeadOpen(true);
  };
  const closeLeadModal = () => setLeadOpen(false);
  const openLeadPage = () => { navigate('lead'); };

  // Header current page mapping
  const currentPage = page;

  return (
    <>
      <Header currentPage={currentPage} navigate={navigate} openLeadModal={openLeadModal} />

      {page === 'home'    && <HomePage    navigate={navigate} openLeadModal={openLeadModal} openLeadPage={openLeadPage} />}
      {page === 'program' && <ProgramDetail navigate={navigate} openLeadModal={openLeadModal} />}
      {page === 'lead'    && <LeadPage    navigate={navigate} />}

      <Footer navigate={navigate} />

      {page === 'program' && <StickyApply onApply={() => openLeadModal('Online MBA')} priceTop="Online MBA · EMI" priceText="₹7,084/mo · 24 months" />}
      {page === 'home'    && <StickyApply onApply={() => openLeadModal()} priceTop="Admissions open · July 2025" priceText="EMI from ₹3,499/mo" />}

      <FloatingChat />

      <LeadModal
        open={leadOpen}
        onClose={closeLeadModal}
        defaultProgram={leadProgram ? leadProgram : undefined}
        openLeadPage={openLeadPage}
      />
    </>
  );
};

window.App = App;
