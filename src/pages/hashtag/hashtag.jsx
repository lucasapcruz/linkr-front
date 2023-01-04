import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";

export default function HashtagPage() {

  const {hashtag} = useParams();

  return (
    <>
      <Header />
      <MainContainer pageTitle={`# ${hashtag}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        dolores fugiat natus laborum porro aliquid ad ducimus reprehenderit
        soluta? Hic odit error ab recusandae. Voluptas totam sint odio veritatis
        mollitia! Corporis incidunt architecto dolorum a similique suscipit
        doloribus iusto. Blanditiis quidem et dolorum ipsum culpa veritatis quas
        sit, quia placeat illum autem molestiae nam ad ex qui. Dicta, similique
        aut! Adipisci, similique ullam. Amet sequi, quod officia magni totam,
        laudantium velit aperiam placeat, voluptatibus animi vero neque
        reiciendis labore expedita fugiat? Officiis reiciendis sed pariatur?
        Assumenda suscipit voluptatem ex maxime! At neque assumenda ratione
        numquam harum consectetur autem tenetur magnam atque sunt doloremque
        dolores eaque pariatur quibusdam vitae rem deleniti voluptas vel, sed
        libero dignissimos. Molestiae doloribus rerum facere nobis! Laboriosam
        rem sint, harum illo labore dolore est aliquid unde ducimus iure
        assumenda consequatur magnam, dolor, reiciendis inventore necessitatibus
        maxime ad vel quo. Suscipit aspernatur, voluptas maiores non officiis
        natus. Culpa praesentium dignissimos veritatis! Fugiat amet tempore
        repellat hic, enim deleniti harum iste, exercitationem esse odio natus
        officia! Eius ut vero ipsam amet ex accusamus recusandae ratione id
        possimus qui. Ratione veniam adipisci incidunt dolore? Possimus eveniet
        doloremque mollitia a. Veniam provident dolorem, doloribus tempora
        repudiandae saepe pariatur tenetur! Reprehenderit fugiat maiores debitis
        provident error harum dolorum amet dolor accusamus. Aut, quibusdam
        labore eum quis mollitia illum deserunt quos soluta quidem. Hic, aut
        facere? Odit unde temporibus placeat porro quasi sequi molestiae, maxime
        asperiores, distinctio magni minima alias, numquam quas! Provident rem
        ab, facere debitis corporis eveniet aperiam deserunt atque quaerat
        dolore. Minus mollitia eligendi fuga nulla hic, assumenda molestias ea
        velit expedita iure blanditiis? Expedita numquam nostrum quae magni!
        Similique earum obcaecati quae cum sit ut voluptatibus deleniti in,
        explicabo temporibus sapiente veniam illo a facere debitis cumque. Vero
        enim placeat dolor quia tempore quasi laborum maiores non inventore.
      </MainContainer>
    </>
  );
}
