import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="page-home">
      <div className="container">
        <div className="page-home__hero">
          <h1 className="page-home__title">
            <span>RoofMaster</span> — расчёт угла наклона кровли
          </h1>
          <p className="page-home__subtitle">
            Подберите оптимальный угол наклона кровли для вашего дома.
            Выберите кровельные материалы и получите профессиональный расчёт
            с учётом снеговой и ветровой нагрузки вашего региона.
          </p>
          <Link className="page-home__cta-button" to="/materials">
            Перейти к материалам
          </Link>
        </div>

        <div className="page-home__features">
          <div className="page-home__feature">
            <div className="page-home__feature-number">1</div>
            <h3 className="page-home__feature-title">Выбор материалов</h3>
            <p className="page-home__feature-text">
              Ознакомьтесь с каталогом кровельных материалов и выберите
              подходящие для вашего проекта
            </p>
          </div>
          <div className="page-home__feature">
            <div className="page-home__feature-number">2</div>
            <h3 className="page-home__feature-title">Создание заявки</h3>
            <p className="page-home__feature-text">
              Добавьте выбранные материалы в заявку и укажите параметры
              нагрузки для вашего региона
            </p>
          </div>
          <div className="page-home__feature">
            <div className="page-home__feature-number">3</div>
            <h3 className="page-home__feature-title">Получение расчёта</h3>
            <p className="page-home__feature-text">
              Система рассчитает оптимальный угол наклона для каждого
              выбранного материала
            </p>
          </div>
        </div>

        <div className="page-home__about">
          <h2 className="page-home__about-title">О сервисе</h2>
          <p className="page-home__about-text">
            RoofMaster — это сервис для расчёта оптимального угла наклона кровли.
            Мы учитываем характеристики кровельных материалов, снеговую и ветровую
            нагрузку, чтобы подобрать идеальный угол наклона для вашей крыши.
            Наш каталог включает металлочерепицу, профнастил, гибкую черепицу,
            керамическую черепицу и другие современные материалы.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
