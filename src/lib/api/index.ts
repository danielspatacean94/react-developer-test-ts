import { usersDiff, projectsDiff } from './data';

const DEFAULT_DELAY = 2000;
const PAGE_SIZE = 3;

const resolveOrRejectCollection = (collection: any[]) => {
  let timesCalled = 0;
  return () => {
    return new Promise<{ code: number, data: any[], limit: number, offset: number, total: number } | { code: number, error: string, data: any }>((resolve, reject) => {
      const id = setTimeout(() => {
        timesCalled += 1;
        const sliceStart = PAGE_SIZE * (Math.ceil(timesCalled / 2) - 1);
        const sliceEnd = PAGE_SIZE * Math.ceil(timesCalled / 2);
        const totalItems = collection.length;
        const hasItems = sliceStart < totalItems;

        clearTimeout(id);

        if (timesCalled % 2 === 0) {
          return reject({
            code: 500,
            error: 'Uknown error',
          });
        }

        return resolve({
          code: 200,
          data: collection.slice(sliceStart, sliceEnd),
          limit: PAGE_SIZE,
          offset: hasItems ? sliceStart : totalItems,
          total: totalItems,
        });
      }, DEFAULT_DELAY);
    });
  }
};

const getProjectsDiff = resolveOrRejectCollection(projectsDiff);
const getUsersDiff = resolveOrRejectCollection(usersDiff);


const exported = {
  getProjectsDiff,
  getUsersDiff,
};

export default exported;