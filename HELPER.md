## Kullanılmayan kütüphaneleri tespit etmek için.

Kütüphaneyi yükle.
```
npm install -g depcheck
```

Sonra bunu projenin ana dizininde çalıştır.
```
depcheck
```

## Projeyi son expo versiyonuna yükseltmek için.

Son expo versiyonunu yükle
```
npm install expo@latest
```

Sonra diğer kütüphanelerin expo ile uyumlu versiyonlarını yükle.
```
npx expo install --fix
```

## Build almak için.

Eas kütüphanesini global olarak yükle.
```
npm install -g eas-cli
```

Expo hesabına giriş yap.
```
eas login
```

Apk build almak için çalıştır.
```
eas build -p android -e apk
```