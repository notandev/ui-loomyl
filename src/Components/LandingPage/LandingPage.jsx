import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../Ui/Navbar';
import Background from '../../Assets/hero-1.png';
import firstmonth from '../../Assets/Ellipse 155.png';
// import Kalender from '../../Assets/Kalender.png';
import thumb from '../../Assets/Rectangle 1206.png';
import artikel2 from '../../Assets/Artikel-2.png';
import artikel3 from '../../Assets/Artikel-3.png';
import artikel4 from '../../Assets/Artikel-4.png';
import artikel5 from '../../Assets/Artikel-5.png';
import artikel6 from '../../Assets/Artikel-6.png';
import Footer from '../Ui/Footer';
// import { useNavigate } from 'react-router-dom';
import Note from '../Note';
import AddNote from '../Note/addNote';
import { getNotepadByUserId } from '../../api/notepad';
import { useAuth } from '../../state/AuthProvider';
import DetailNote from '../Note/detailNote';
import Calendar from './Calendar';
import Modal from './Modal';
import PopUpCalendar from './PopUpCalendar';

function LandingPage() {
  const [showAddNote, setAddNote] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const [showDetailNote, setShowDetailNote] = useState(false);
  const [showDetailCalendar, setShowDetailCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [notepad, setNotepad] = useState([]);
  const [todolist, setTodolist] = useState([]);
  const { user } = useAuth();
  const userId = user.id;
  const [noteId, setNoteId] = useState('');
  const [isActive, setIsActive] = useState({
    id: 1,
    title: 'Bulan 1',
    calender_month: 'Bulan Ke-1',
    src: firstmonth,
    desc: 'Saat hamil 1 bulan, tubuh Bumil memang belum terlihat seperti orang hamil. Meski demikian, Bumil mungkin telah merasakan beberapa gejala kehamilan, baik secara fisik maupun emosional, akibat perubahan hormon pada tubuh. Dan usia kandungan 1-3 bulan disebut trimester pertama. \n\nPerhitungan usia kehamilan sebenarnya lebih akurat jika menggunakan jumlah minggu. Hal ini karena usia kehamilan yang dianggap cukup bulan adalah 38–40 minggu dihitung dari hari pertama haid terakhir (HPHT). \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 1 bulan pada kalendar di samping!',
  });

  const handleDateClick = (date) => {
    const data = todolist.filter(item => item.No === date);
    setSelectedDate(date);
    setSelectedData(data);
    setShowDetailCalendar(true);
  };

  const handleGetNotepad = useCallback(() => {
    getNotepadByUserId(userId).then((res) => {
      setNotepad(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [userId]);

  useEffect(() => {
    handleGetNotepad();
  }, [handleGetNotepad]);

  useEffect(() => {
    fetchTodolist(isActive.id);
  }, [isActive]);

  const fetchTodolist = (month) => {
    console.log(month);
    fetch(`/data${month}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Pastikan data diterima sebelum menggunakannya
        setTodolist(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleAddNoteClick = () => {
    setShowIndex(false);
    setAddNote(true);
    setShowDetailNote(false);
  };

  const handleAddNoteClose = () => {
    setShowIndex(true);
    setAddNote(false);
    setShowDetailNote(false);
    handleGetNotepad();
  };

  const handleIndex = () => {
    setShowIndex(true);
    setAddNote(false);
    setShowDetailNote(false);
  };

  const handleIndexClose = () => {
    setShowIndex(false);
    setAddNote(false);
    setShowDetailNote(false);
  }

  const handleDetailNote = (id) => {
    setAddNote(false);
    setShowIndex(false);
    setShowDetailNote(true);
    setNoteId(id);
  }

  const handleDetailNoteClose = () => {
    setShowIndex(true);
    setAddNote(false);
    setShowDetailNote(false);
  }

  const handleDetailCalendar = () => {
    setShowDetailCalendar(true);
  }

  const pagination = [
    {
      id: 1,
      title: 'Bulan 1',
      calender_month: 'Bulan Ke-1',
      src: firstmonth,
      desc: 'Saat hamil 1 bulan, tubuh Bumil memang belum terlihat seperti orang hamil. Meski demikian, Bumil mungkin telah merasakan beberapa gejala kehamilan, baik secara fisik maupun emosional, akibat perubahan hormon pada tubuh. Dan usia kandungan 1-3 bulan disebut trimester pertama. \n\nPerhitungan usia kehamilan sebenarnya lebih akurat jika menggunakan jumlah minggu. Hal ini karena usia kehamilan yang dianggap cukup bulan adalah 38–40 minggu dihitung dari hari pertama haid terakhir (HPHT). \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 1 bulan pada kalendar di samping!',
    },
    {
      id: 2,
      title: 'Bulan 2',
      calender_month: 'Bulan Ke-2',
      src: '/landingpagemonth/month2.png',
      desc: 'Saat memasuki usia hamil 2 bulan atau 8 minggu, janin di dalam rahim kini berukuran sebesar kacang tanah dengan panjang sekitar 1,6 cm dan berat 1 gram. Di minggu ke-8 ini, janin akan mengalami berbagai perkembangan, di antaranya: Tampilan wajah mulai terbentuk, dengan hidung dan kelopak mata yang mulai nampak. \n\nPerubahan ini terjadi karena semua sistem di dalam tubuh ibu sedang menyesuaikan diri untuk membantu perkembangan janin yang ada di dalam kandungan. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 2 bulan pada kalendar di samping!',
    },
    {
      id: 3,
      title: 'Bulan 3',
      calender_month: 'Bulan Ke-3',
      src: '/landingpagemonth/month3.png',
      desc: 'Saat memasuki usia hamil 3 bulan, janin umumnya memiliki berat badan sekitar 25 gram dengan panjang kurang lebih 8 cm. Angka tersebut akan bertambah setiap minggunya seiring dengan perkembangan organ tubuh janin. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 3 bulan pada kalendar di samping!',
    },
    {
      id: 4,
      title: 'Bulan 4',
      calender_month: 'Bulan Ke-4',
      src: '/landingpagemonth/month4.png',
      desc: 'Saat hamil 4 bulan atau sekitar 17–20 minggu, janin sudah semakin aktif sehingga pergerakannya mulai bisa dirasakan oleh Bumil. Pada usia kehamilan ini, tubuh janin akan semakin membesar dan bentuk wajahnya akan terlihat semakin jelas. \n\nSelain pada janin, perubahan yang signifikan juga terlihat pada tubuh Bumil saat hamil 4 bulan. Pada usia kehamilan ini, baby bump atau kondisi perut Bumil yang membesar karena kehamilan akan muncul. Sehingga, Bumil mungkin sudah perlu mengenakan baju hamil yang longgar dan nyaman. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 4 bulan pada kalendar di samping!',
    },
    {
      id: 5,
      title: 'Bulan 5',
      calender_month: 'Bulan Ke-5',
      src: '/landingpagemonth/month5.png',
      desc: 'Pada usia kehamilan 5 bulan atau memasuki minggu ke-21 ini, bayi Anda umumnya memiliki panjang sekitar 21-22 cm, dengan berat sekitar 340-360 gram. Janin Anda telah menyerupai bayi yang siap lahir, namun dalam ukuran yang sangat kecil. \n\nOrgan pankreas makin matang, bibir makin terbentuk, dan mata terlihat makin sempurna. Tetapi iris atau bagian dalam bola mata masih membutuhkan lebih banyak pigmen. Kelopak dan alis matanya telah terbentuk. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 5 bulan pada kalendar di samping!',
    },
    {
      id: 6,
      title: 'Bulan 6',
      calender_month: 'Bulan Ke-6',
      src: '/landingpagemonth/month6.png',
      desc: 'Saat hamil 6 bulan, Bumil sudah dapat berinteraksi dengan Si Kecil di dalam kandungan melalui sentuhan dan suara. Si Kecil pun dapat merespons Bumil dengan gerakan dari dalam perut. Tidak hanya membuat kehamilan terasa menyenangkan, hal ini juga menjadi tanda bahwa janin dalam kondisi sehat. \n\nSaat usia kehamilan 5 bulan, ibu hamil mungkin tidak begitu yakin apakah janin dapat mendengar atau merasakan sentuhan. Namun, saat hamil 6 bulan, janin di dalam rahim biasanya sudah mulai bergerak sangat aktif dan bisa merespons suara serta sentuhan dengan gerakan atau tendangan kecil. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 6 bulan pada kalendar di samping!',
    },
    {
      id: 7,
      title: 'Bulan 7',
      calender_month: 'Bulan Ke-7',
      src: '/landingpagemonth/month7.png',
      desc: 'Saat hamil 7 bulan, sebagian wanita akan merasa napasnya lebih berat atau sesak seiring makin besarnya ukuran janin dan rahim. Keluhan ini biasanya akan mereda setelah posisi janin sudah siap lahir di beberapa minggu berikutnya, yaitu ketika kepala janin terletak di bagian bawah rahim. \n\nPertumbuhan dan perkembangan janin saat hamil 7 bulan akan makin pesat. Hal ini membuat kebutuhan nutrisi janin juga meningkat dan mencapai titik puncaknya pada kehamilan trimester ketiga. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 7 bulan pada kalendar di samping!',
    },
    {
      id: 8,
      title: 'Bulan 8',
      calender_month: 'Bulan Ke-8',
      src: '/landingpagemonth/month8.png',
      desc: ' Pada tahap Kehamilan bulan 8 ini, perkembangan otak Si kecil meningkat pesat. Otaknya membangun miliaran koneksi kompleks yang dia butuhkan setelah lahir sehingga dia dapat bernafas, menyusui dan menelan. Ibu dapat mendukung perkembangan pesat otak Si kecil dengan konsumsi DHA, asam lemak omega-3 yang dapat ditemukan dalam makanan seperti salmon dan sarden. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 8 bulan pada kalendar di samping!',
    },
    {
      id: 9,
      title: 'Bulan 9',
      calender_month: 'Bulan Ke-9',
      src: '/landingpagemonth/month9.png',
      desc: 'Pada masa kehamilan usia 9 bulan, perkembangan bayi dalam kandungan anda telah mencapai tahapan yang sempurna dan ia pun kini siap untuk dilahirkan ke dunia. Sebaiknya anda sudah mulai mempersiapkan diri dan bersiaga agat dapat segera ke rumah sakit bersalin pada saat terjadi kontraksi terasa semakin intens dan teratur. \n\n Pada bulan ke 9 atau sekitar minggu ke 37, berat badan si kecil kini sudah lebih besar, yakni sekitar 2,8 kilogram. Sementara panjang tubuhnya kini udah sekitar 48,6 cm. Persalinan yang terjadi pada usia ini sudah dianggap cukup umur karena perkembangan bayi sudah memasuki masa yang sempurna. \n\nPeriksa rekomendasi asupan gizi dan rekomendasi olahraga untuk usia kehamilan 9 bulan pada kalendar di samping!',
    },
  ];

  return (
    <>
      <div className='relative z-20'>
        <Navbar />
      </div>
      <div className="w-full h-full flex flex-col overflow-y-hidden">
        <div className='bg-landing-page relative w-full bg-cover '>
          <div class="absolute inset-0 bg-black  opacity-50"></div>
          <div className='w-[90%] mx-auto pt-36 relative z-10 pb-96 '>
            <h1 className='text-7xl font-bold text-white py-5'>Wanita Hamil </h1>
            <h1 className='text-7xl font-bold text-[#14116E] pb-10'>Wanita Kuat</h1>
            <i className='text-white'>Memberdayakan Ibu dengan Pengetahuan dan Dukungan</i>
          </div>
        </div>
        <div className="pt-10 w-full flex justify-center">
          <div className="w-11/12 h-full">
            <p className="font-semibold text-5xl md:text-5xl text-left text-[#14116E]">Kalender Kehamilan</p>
            <div className="border-b-2 border-gray-500 pt-5 md:pt-10"></div>
            <div className="bg-gray-300 w-[90px] md:w-[160px] h-[35px] md:h-[62px] rounded-r-full grid place-content-center mt-7 md:mt-14">
              <p className="md:h-full md:w-full text-center text-[#14116E] text-lg md:text-3xl ">{isActive.title}</p>
            </div>
            <div key={isActive.id} className="flex pt-14">
              <div className="w-full md:w-[60%] h-auto pr-10">
                <div className="w-full h-fit flex justify-center">
                  <img src={isActive.src} alt="1 Month" className="w-fit h-[190px]" />
                </div>
                <div className="w-full h-full pt-5">
                  <pre className="whitespace-pre-wrap font-sans text-left">{isActive.desc}</pre>
                  <div className="flex pt-12 ">
                    {pagination.map((val, i) => {
                      return (
                        <div key={i} className="px-2">
                          <button onClick={() => setIsActive(pagination.find((item) => item.id === val.id))} className={`px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-500 ${isActive.id === val.id && 'bg-blue-100 text-blue-500'}`}>
                            {val.id}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[500px] h-auto pl-10">
                <div className='bg-indigo-800 p-3 flex justify-between rounded-t-md'>
                  <h1 className='text-white'>{isActive.calender_month}</h1>
                  <button onClick={handleIndex} className='bg-white rounded-lg text-xs px-2'>Memo</button>
                </div>
                <div className=" flex-wrap flex w-[470px] h-[275px]">
                  {Array.from({ length: 30 }, (_, j) => {
                    console.log(todolist.filter(item => item.No === j + 1));
                    return (
                      <div key={j} onClick={() => handleDateClick(j + 1)} className="w-[77px] h-[77px] text-left p-1 ring-slate-200 ring-1">
                        {j + 1}
                        {/* {todolist.filter(item => item.No === j + 1).map(item => (
                          <div key={item.No}>
                            <p>{item.todolist}</p>
                            <p>{item.Activity}</p>
                            <p>{item.Consume}</p>
                          </div>
                        ))} */}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {showAddNote && <AddNote show={showAddNote} onClose={handleAddNoteClose} />}
                  {showIndex && <Note show={showIndex} notepad={notepad} onAddNoteClick={handleAddNoteClick} onDetailNoteClick={handleDetailNote} onRefresh={handleGetNotepad} onClose={handleIndexClose} />}
                  {showDetailNote && <DetailNote show={showDetailNote} id={noteId} onClose={handleDetailNoteClose} />}
                  {showDetailCalendar && <PopUpCalendar
                    show={showDetailCalendar}
                    onClose={() => setShowDetailCalendar(false)}
                    date={selectedDate}
                    data={selectedData}
                  />}
                </div>
              </div>
            </div>
            <div className="pt-10">
              <p className="font-semibold text-5xl text-left text-[#14116E]">Artikel Kehamilan</p>
              <div className="border-b-2 border-gray-500 pt-10"></div>
              <div className="w-full h-full flex pt-10">
                <div className="w-full md:w-[75%] h-full grid gap-y-10">
                  <div className="grid grid-cols-3 items-start">
                    <img src={thumb} alt="Thumbnail" className="col-span-1 w-[250px] md:w-full h-fit md:h-full" />
                    <div className="col-span-2 text-left md:px-5 grid place-content-center gap-y-2">
                      <a href="https://herminahospitals.com/id/articles/7-tips-mudah-ibu-hamil-untuk-kehamilan-yang-sehat-dan-nyaman-2bb8cd6a-3f0f-416f-a27a-481fc4e41242.html" className="text-sm md:text-3xl hover:text-blue-600">
                        7 Tips Mudah Ibu Hamil Untuk Kehamilan Yang Sehat dan Nyaman.
                      </a>
                      <p className="text-xs md:text-base">
                        Menjaga kesehatan kehamilan harus dilakukan oleh setiap ibu hamil, hal ini bermanfaat agar janin dapat tumbuh dan berkembang dengan baik sampai tiba saatnya untuk dilahirkan ke dunia.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-start">
                    <img src={artikel2} alt="Thumbnail" className="col-span-1 w-[250px] md:w-full h-fit md:h-full" />
                    <div className=" col-span-2 text-left md:px-5 grid place-content-center gap-y-2">
                      <a href="https://www.halodoc.com/artikel/ini-6-jenis-kelas-kehamilan-yang-bisa-ibu-hamil-ikuti" className="text-sm md:text-3xl hover:text-blue-600">
                        Ini 6 Jenis Kehamilan yang bisa ibu hamil ikuti
                      </a>
                      <p className="text-xs md:text-base">
                        berbagai kelas soal kehamilan dapat membantu ibu mempersiapkan diri untuk melahirkan dan merawat bayi. Mengikuti kelas kehamilan adalah cara yang bagus untuk merasa lebih siap untuk menyambut kehadiran buah hati. Ini
                        juga bisa jadi persiapan yang baik untuk ibu yang baru pertama kali mengalami kehamilan.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-start">
                    <img src={artikel3} alt="Thumbnail" className="w-[250px] md:w-full h-fit md:h-full" />
                    <div className="col-span-2 text-left md:px-5 grid place-content-center gap-y-2">
                      <a href="https://pyfahealth.com/blog/kenali-contoh-gejala-maag-saat-hamil/" className="text-sm md:text-3xl hover:text-blue-600">
                        Kenali Contoh Gejala Maag Saat Hamil
                      </a>
                      <p className="text-xs md:text-base">
                        Ibu hamil merupakan salah satu kelompok yang rentan terkena maag. Agar bisa segera ditangani, ada beberapa contoh gejala maag saat hamil yang perlu diketahui. Apa saja gejala maag pada ibu hamil dan cara
                        mengatasinya?
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-start">
                    <img src={artikel4} alt="Thumbnail" className="w-[250px] md:w-full h-fit md:h-full" />
                    <div className="col-span-2 text-left md:px-5 grid place-content-center gap-y-2">
                      <a href="https://www.alodokter.com/ibu-hamil-jangan-marah-marah-terus-ini-efeknya-pada-bayi" className="text-sm md:text-3xl hover:text-blue-600">
                        Ibu Hamil Sering Marah? Ini Efek Sampingnya Bagi Janin dan Cara...
                      </a>
                      <p className="text-xs md:text-base">
                        Perubahan suasana hati sangat umum terjadi selama kehamilan. Naik turunnya emosi ini disebabkan oleh berbagai faktor. Ibu hamil merupakan salah satu kelompok yang rentan terkena maag. Agar bisa segera ditangani, ada
                        beberapa contoh gejala maag saat hamil yang perlu diketahui.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-start">
                    <img src={artikel5} alt="Thumbnail" className="w-[250px] md:w-full h-fit md:h-full" />
                    <div className="col-span-2 text-left md:px-5 grid place-content-center gap-y-2">
                      <a href="https://www.alodokter.com/ini-4-manfaat-senam-hamil-yang-perlu-bumil-ketahui" className="text-sm md:text-3xl hover:text-blue-600">
                        Ini 4 Manfaat Senam Hamil yang Perlu Bumil Ketahui
                      </a>
                      <p className="text-xs md:text-base">
                        Senam hamil adalah salah satu upaya yang bisa dilakukan ibu hamil untuk mempersiapkan diri menghadapi persalinan. Segala perubahan yang terjadi saat kehamilan bisa menyebabkan Bumil menjadi mudah lelah dan enggan
                        untuk melakukan aktivitas apa pun.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-start">
                    <img src={artikel6} alt="Thumbnail" className="w-[250px] md:w-full h-fit md:h-full" />
                    <div className="col-span-2 text-left md:px-5 grid place-content-center gap-y-2">
                      <a href="https://www.halodoc.com/artikel/inilah-7-vitamin-penting-yang-dibutuhkan-ibu-hamil" className="text-sm md:text-3xl hover:text-blue-600">
                        Inilah 7 Vitamin Penting yang Dibutuhkan Ibu Hamil
                      </a>
                      <p className="text-xs md:text-base">
                        Ibu hamil membutuhkan vitamin untuk menjaga kesehatan tubuh dan janin dalam kandungan. Berbagai nutrisi tersebut dibutuhkan untuk memastikan tumbuh kembang janin secara sehat untuk ibu dan bayi.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[25%]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-32'>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
