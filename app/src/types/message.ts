interface IMessage {
  id?: string,
  sender: string,
  receiver: string,
  ref?: string,
  files?: IFile[] | null,
  text?: string | null
};

interface IMessageWeak {
  id?: string,
  sender?: string,
  receiver?: string,
  ref?: string,
  files?: IFile[] | null,
  text?: string | null
};

interface IFile {
  path: string,
  mimeType: string,
  size: number,
  id: string,
  name: string,
  type: string
}

export type { IMessage, IFile };
