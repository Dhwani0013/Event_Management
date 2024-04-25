import "./BtnSeeAll.scss";

const BtnSeeAll=(props)=> {
  const {label,onClick}=props || {}
  return (
    
    <div className="btn-container">
      <btn className="btn" onClick={onClick && onClick}> {label ?? 'SEE ALL'}</btn>
    </div>

  );
}

export default BtnSeeAll;
