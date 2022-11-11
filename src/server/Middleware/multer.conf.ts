/* eslint-disable @typescript-eslint/no-var-requires */
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import FirebaseStorage from 'multer-firebase-storage';

class ConfigMulter {
  static UploadFiles(): MulterOptions {
    return {
      storage: FirebaseStorage({
        bucketName: 'upload-batch18.appspot.com',
        credentials: {
          clientEmail:
            'firebase-adminsdk-gt8q7@upload-batch18.iam.gserviceaccount.com',
          privateKey:
            '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDRLJ38hWD5rHT\nNQrw8Rjev/7YnsrEcMmfn3n/wlgCYG3QrOR1eqfoZFsnRnL5z0yCbvj+OsrHaLIN\nPBjKcy2KoKVO/FzfhtO7Ym2F1P/6x8OOJwRvrzKsi4t9YBJ9aODCE00lCERGChJi\n3GaVZT0ldDNH094UIvaiT6trhIEYVvtXTvg7xd0TacL2lCMW9LSkscRegcmg9Uk5\ntlMQfHymi7SkgVumqmWfX5AT3LqO1szi2sagqrrVJ5pS2H7t80sFSD8cNGOrycju\nP8dvI0w1U7PDVzmIwPhXRoZagZL9jVCC5DWRD6SiQIHQH4tQTZCXOZFJ8sGTpeWO\n/GZb1W5FAgMBAAECggEAEQ5kmmaKa5GQkdbNxFsC5Z4WqBxCsOL7MZawBN+YaWi7\n3uDjOcHDfeCaN7WHIHvzfmcsF6TSBpYGC3Lm5XQnE7dRiTMw95Ni1jjUQT7oNyMQ\n2U9eK1U902WDAyoLo2mwTDN8ZxIwSH/juD/xM/Z6X1Wljw4aFV8ydN4JpqQV1KbJ\nHc9SDLbMdKiatqUuJNcCfEWaxlTuqIL4xGDveALB5703Gs6pbmgC2WsoOtYKSoDc\njgtVRxKNqyXp2cfd/jagm2QSTXU4B1EbsibHvU8oBoVNDH3hdWNevC7d7Uqdse4g\nlzp1B4gWEtwFOmq2AEGk3vZhgFdZeyODZzpyEltUZwKBgQD3eFHggrdFS9tsRnAM\nth5wzx+ARrd6Bfp5sElv8XkgKFXqWM3ZJjqIpf/W01j7emyQu248k2nKZsd6kdgh\njC8d1/JcYQSiCsC2PjSdwL9bkrTWX4F/x9v0nP+DvscWOtM4lwnDmtPchfdzN1aM\nFu7/vXODAgAiRjbjVfvMSqrKVwKBgQDJ/7+4fW35IxKrx3ecj1bGoLsGt613ivyK\n1MUD0FzfTKHuKQJGA8hJIfq9NcUN61UxC5c7hw5qxrdfeKgv2nAiFfBcyxVk/WYL\nofU1y92WAIpbiD16dmvF4J7Kbs4kdXVnCZzDwV6GQzt7Bf6H0q+GmuLP+d+I5fOf\nyHLe2vhiwwKBgGtH6t7UbBULdJ000ACCtyGaeQKIJaQtkU9NwBhaa3MoaU6Fnv+D\nVh7FL+r2hn3Gref0iS6TjWokMlgNf8/TUN20LyojGPoShUa8It08oPhW2jSRBLfb\ncZxSr2ZyvyYA7G5888urhCr2nLaDB+8FRijx/XCO3nX9UHAvZ1BCElZTAoGAf43n\n2vAZicEEAUUr2skI2tSURWGnQF2bq29AGXBxtPAHMQTkUqIAz22Nj/1sOaXpXdcb\n4JMgH3zsPnVKfy1Isb140p/LGsKItb/Hv/jEK/ybYcFeUP6Gf6Wfn+Tod01UnYQM\nYfCxZ8b8wGrAl7QK8szLfNkktqW+eZ9yKhfL0VECgYEAwJQYsrFElgKY2G24e+FT\nmQ7cSL6q/QPlSeqZNi7zX09IEPLVAV5Ntbp1+evfGwZ1YxkdU+AZJblycPy6vWj4\nMJXCdwTl2qe/cSOugQ8LCiOXPJbQUhfGK1yj3pRoZP8X2oqw3wlU+bVzw671QIim\nyDUfhEftzJdYXB9JwuhLn5Q=\n-----END PRIVATE KEY-----\n',
          projectId: 'upload-batch18',
        },
      }),
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
          file.filename == file.originalname;
          callback(null, true);
        } else {
          return callback(
            new Error('Only .png, .jpg, .jpeg and .pdf format allowed'),
            false,
          );
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    };
  }
}
export { ConfigMulter };
