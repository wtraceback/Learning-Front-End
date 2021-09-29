declare namespace DataType {
    interface IMovieItem {
        name: string,
        quote: string,
        score: string,
        ranking: string,
        cover_url: string,
        evaluators_num: string,
    }

    interface IState {
        isLogin: boolean,
        loading: boolean,
        dimensions_arr: string[],
        data: IMovieItem[],
    }
}