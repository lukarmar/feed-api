
import { v4 as uuidV4 } from 'uuid'

export abstract class Entity<T> {
  private readonly _id: string;
  
  protected props: T;

  protected constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? uuidV4();
  }

   get id(): string {
    return this._id;
  }
}
