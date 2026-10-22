import { useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Container from "../Container/Container";
import CarouselNav from "../CarouselNav/CarouselNav";
import { useContainerOffset } from "../../hooks/useContainerOffset";
import styles from "./Carousel.module.scss";

type CarouselItem = { id?: string | number };

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  slideWidth?: number;
  gap?: number;
  extraSlide?: ReactNode;
  footerStart?: ReactNode;
  tone?: "dark" | "light";
};

export default function Carousel<T>({
  items,
  renderItem,
  slideWidth = 294,
  gap = 24,
  extraSlide = null,
  footerStart = null,
  tone = "dark",
}: CarouselProps<T>) {
  const offset = useContainerOffset();
  const [swiper, setSwiper] = useState<{
    slidePrev: () => void;
    slideNext: () => void;
    isBeginning?: boolean;
    isEnd?: boolean;
  } | null>(null);
  const [edges, setEdges] = useState({ begin: true, end: false });

  const sync = (s: { isBeginning?: boolean; isEnd?: boolean }) =>
    setEdges({ begin: Boolean(s.isBeginning), end: Boolean(s.isEnd) });

  return (
    <div className={styles.carousel} style={{ "--slide-w": `${slideWidth}px` }}>
      <Swiper
        className={styles.swiper}
        slidesPerView="auto"
        spaceBetween={gap}
        slidesOffsetBefore={offset}
        slidesOffsetAfter={offset}
        grabCursor
        onSwiper={(s) => {
          setSwiper(s);
          sync(s);
        }}
        onSlideChange={sync}
        onReachBeginning={sync}
        onReachEnd={sync}
        onFromEdge={sync}
        onResize={sync}
      >
        {items.map((item, index) => {
          const itemKey = (item as CarouselItem)?.id ?? index;

          return (
            <SwiperSlide key={itemKey} className={styles.slide}>
              {renderItem(item, index)}
            </SwiperSlide>
          );
        })}
        {extraSlide && (
          <SwiperSlide className={styles.slide}>{extraSlide}</SwiperSlide>
        )}
      </Swiper>

      <Container className={styles.footer}>
        <div>{footerStart}</div>
        <CarouselNav
          tone={tone}
          onPrev={() => swiper?.slidePrev()}
          onNext={() => swiper?.slideNext()}
          disablePrev={edges.begin}
          disableNext={edges.end}
        />
      </Container>
    </div>
  );
}
