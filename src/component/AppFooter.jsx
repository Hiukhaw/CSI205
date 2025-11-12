const AppFooter = () => {
    return ( 
        <>
        <div className="text-center mt-3 bg-success text-white p-2 rounded-3">
        <h3>มหาวิทยาลัยศรีปทุม คณะเทคโนโลยีสารสนเทศ</h3>
        <p> สาขาวิชาวิทยาการคอมพิวเตอร์ และนวัตกรรมการพัฒนาซอฟต์แวร์</p>
        </div>
        <div className="text-center text-white p-2 rounded-3 ">
        <a className="m-3" href="https://www.facebook.com/share/1BiyJFrhbD/?mibextid=wwXIfr" ><i class="bi bi-facebook " style={{ fontSize: '2rem' }}></i></a>
        <a className="m-3" href="https://github.com/Hiukhaw"><i class="bi bi-github" style={{ fontSize: '2rem' }}></i></a>
        <a className="m-3" href="https://www.instagram.com/no_mpang" ><i class="bi bi-instagram" style={{ fontSize: '2rem' }}></i></a>
        </div >
        </>
     )
}
 
export default AppFooter;