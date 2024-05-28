import Input from '../../components/common/input';
import Button from '../../components/common/button';
import Footer from '../../components/common/footer';

export default function signin(){
  return(
    <div>
      <div className='box'>
        <Input title="아이디" placeholder="이메일 입력" />
        <Button 
          buttonSize="formBtn"
          colorStyle="blueWhite"
          content="로그인"
          onClick={() => console.log('Button clicked')}
        />
      </div>
      <Footer />
    </div>
  )
}