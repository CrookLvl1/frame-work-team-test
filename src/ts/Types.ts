export type Painting = {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
};

export type Author = {
  id: number;
  name: string;
};

export type Location = {
  id: number;
  location: string;
};

export type Filter = {
  created_gte?: number,
  created_lte?: number,
  _page?: number;
  q?: string,
} & Partial<Pick<Painting, 'authorId' | 'locationId'>>;

export type PaintingRequestParams = {
  id?: number;
  _limit?: number,
} & Partial<Painting> & Partial<Filter>;

// export type PaintingRequestParams = {
//   [Key in keyof PaintingRequestParamsRaw]: PaintingRequestParamsRaw[Key] | null;
// };


//constructors

type ExtractIdType<T extends { id: any }> = Pick<T, 'id'>[keyof Pick<T, 'id'>];

export type Option<T> = {
  title: string;
  value: T | null;
};

//auxiliary
export type FilterKey = keyof Filter;

export type FilterTypeFromKey<Key extends FilterKey> = Filter[Key];

export type LocationId = ExtractIdType<Location>;

export type AuthorId = ExtractIdType<Author>;

export type AuthorsOptionArr = Array<Option<AuthorId>>;

export type LocationsOptionArr = Array<Option<LocationId>>;

export type CreatedKeys = keyof Pick<Filter, 'created_gte' | 'created_lte'>;