type JobRequest = {
  id: string;
  service: string;     // "Canalização", "Eletricidade", "Pintura"
  city: string;        // "Lisboa", "Porto", "Braga", "Coimbra"
  startsAt: string;    // ISO 8601
  durationMin: number;
  priceCents: number;
  urgent: boolean;
};

export type { JobRequest };